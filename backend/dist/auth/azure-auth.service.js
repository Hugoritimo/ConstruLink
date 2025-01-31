"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureAuthService = void 0;
const axios_1 = require("axios");
const dotenv = require("dotenv");
dotenv.config();
class AzureAuthService {
    async getAccessToken() {
        const tokenUrl = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`;
        const response = await axios_1.default.post(tokenUrl, new URLSearchParams({
            client_id: process.env.AZURE_CLIENT_ID,
            client_secret: process.env.AZURE_CLIENT_SECRET,
            scope: 'https://graph.microsoft.com/.default',
            grant_type: 'client_credentials',
        }));
        return response.data.access_token;
    }
}
exports.AzureAuthService = AzureAuthService;
//# sourceMappingURL=azure-auth.service.js.map