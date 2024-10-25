// pages/api/save-to-sharepoint.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { formData } = req.body;

        try {
            // Obter um token de acesso (OAuth 2.0 Client Credentials)
            const tokenResponse = await axios.post(
                "https://login.microsoftonline.com/YOUR_TENANT_ID/oauth2/v2.0/token",
                new URLSearchParams({
                    client_id: "YOUR_CLIENT_ID",
                    client_secret: "YOUR_CLIENT_SECRET",
                    scope: "https://graph.microsoft.com/.default",
                    grant_type: "client_credentials",
                })
            );

            const accessToken = tokenResponse.data.access_token;

            // Converter os dados do formulário em um formato adequado para o Excel
            const excelData = [
                // Cabeçalhos
                [
                    "Nº RDO",
                    "Empresa",
                    "Cliente",
                    "Usuário",
                    "Data",
                    // ... outros campos
                ],
                // Dados
                [
                    formData.rdoNumber,
                    formData.empresa,
                    formData.cliente,
                    formData.usuarioPreencheu,
                    formData.dataRelatorio,
                    // ... outros campos
                ],
            ];

            // Salvar os dados no SharePoint
            await axios.put(
                "https://graph.microsoft.com/v1.0/sites/YOUR_SITE_ID/drive/items/YOUR_FILE_ID/content",
                excelData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    },
                }
            );

            res.status(200).json({ message: "Dados salvos no SharePoint com sucesso." });
        } catch (error) {
            console.error("Erro ao salvar os dados no SharePoint:", error);

            let message = "Erro ao salvar os dados no SharePoint.";

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    message += ` Status: ${error.response.status}. Data: ${JSON.stringify(
                        error.response.data
                    )}`;
                    console.error("Data da resposta:", error.response.data);
                    console.error("Status da resposta:", error.response.status);
                    console.error("Cabeçalhos da resposta:", error.response.headers);
                } else if (error.request) {
                    message += " Nenhuma resposta recebida do servidor.";
                    console.error("Nenhuma resposta recebida:", error.request);
                } else {
                    message += ` Erro na configuração da requisição: ${error.message}`;
                    console.error("Erro na configuração da requisição:", error.message);
                }
            } else {
                message += ` Erro inesperado: ${error.message}`;
                console.error("Erro inesperado:", error.message);
            }

            res.status(500).json({ error: message });
        }
    } else {
        res.status(405).json({ error: "Método não permitido." });
    }
}
