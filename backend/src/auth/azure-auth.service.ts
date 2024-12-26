/* eslint-disable prettier/prettier */
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

export class AzureAuthService {
    async getAccessToken(): Promise<string> {
        const tokenUrl = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`;

        const response = await axios.post(
            tokenUrl,
            new URLSearchParams({
                client_id: process.env.AZURE_CLIENT_ID,
                client_secret: process.env.AZURE_CLIENT_SECRET,
                scope: 'https://graph.microsoft.com/.default',
                grant_type: 'client_credentials',
            }),
        );

        return response.data.access_token;
    }
}
