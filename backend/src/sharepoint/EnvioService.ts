import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import { SPFI, spfi } from '@pnp/sp';
import { ConfidentialClientApplication, ClientCredentialRequest } from "@azure/msal-node";
import "@pnp/sp/files";
import * as dotenv from 'dotenv';

dotenv.config();

// Configuração do MSAL
const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID as string,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET as string,
    },
};

const cca = new ConfidentialClientApplication(msalConfig);

// Função para obter o token de acesso
async function getAccessToken(): Promise<string> {
    const clientCredentialRequest: ClientCredentialRequest = {
        scopes: ["https://your-sharepoint-domain.sharepoint.com/.default"],
    };

    const authResult = await cca.acquireTokenByClientCredential(clientCredentialRequest);
    if (authResult && authResult.accessToken) {
        return authResult.accessToken;
    } else {
        throw new Error("Erro ao obter o token de acesso.");
    }
}

// Configura o PnPJS com um fetch personalizado usando o token de acesso
async function getSPInstance(): Promise<SPFI> {
    const token = await getAccessToken();

    const customFetch = (url: string, options: any = {}) => {
        options.headers = {
            ...options.headers,
            "Authorization": `Bearer ${token}`,
        };
        return fetch(url, options);
    };

    return spfi().using({ fetchClientFactory: () => ({ fetch: customFetch as any }) });
}

@Injectable()
export class EnvioService {
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
    ) { }

    async uploadFile(fileBuffer: Buffer, filename: string): Promise<string> {
        const sp = await getSPInstance();

        // 1. Upload para o SharePoint
        const file = await sp.web
            .getFolderByServerRelativePath('/sites/ConstrulinkRDO/Documentos')
            .files.add(filename, fileBuffer, true);

        const fileUrl = file.data.ServerRelativeUrl;

        // 2. Salvar metadados no banco de dados
        const newFile = this.fileRepository.create({
            fileName: filename,
            sharepointUrl: fileUrl,
            uploadDate: new Date(),
        });
        await this.fileRepository.save(newFile);

        return fileUrl;
    }
}
