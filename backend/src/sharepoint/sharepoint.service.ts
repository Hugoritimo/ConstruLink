/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SharePointService {
  private readonly tenantId: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly graphUrl: string;  

  constructor(private readonly configService: ConfigService) {
    this.tenantId = this.configService.get<string>('AZURE_TENANT_ID');
    this.clientId = this.configService.get<string>('AZURE_CLIENT_ID');
    this.clientSecret = this.configService.get<string>('AZURE_CLIENT_SECRET');
    this.graphUrl = 'https://graph.microsoft.com/v1.0';
  }

  // Obter token de acesso
  private async getAccessToken() {
    const url = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;

    const response = await axios.post(url, null, {
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials',
        scope: 'https://graph.microsoft.com/.default',
      },
    });

    return response.data.access_token;
  }

  // Upload de arquivo para o SharePoint
  async uploadFile(fileName: string, fileContent: Buffer) {
    const accessToken = await this.getAccessToken();
    const siteId = '<SEU_SITE_ID>'; // Substitua pelo ID do site SharePoint
    const driveId = '<SEU_DRIVE_ID>'; // Substitua pelo ID da biblioteca

    const url = `${this.graphUrl}/sites/${siteId}/drives/${driveId}/root:/${fileName}:/content`;

    const response = await axios.put(url, fileContent, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/octet-stream',
      },
    });

    return response.data;
  }

  // Listar arquivos no SharePoint
  async listFiles() {
    const accessToken = await this.getAccessToken();
    const siteId = '<SEU_SITE_ID>'; // Substitua pelo ID do site SharePoint
    const driveId = '<SEU_DRIVE_ID>'; // Substitua pelo ID da biblioteca

    const url = `${this.graphUrl}/sites/${siteId}/drives/${driveId}/root/children`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }
}
