"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharePointService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let SharePointService = class SharePointService {
    constructor(configService) {
        this.configService = configService;
        this.tenantId = this.configService.get('AZURE_TENANT_ID');
        this.clientId = this.configService.get('AZURE_CLIENT_ID');
        this.clientSecret = this.configService.get('AZURE_CLIENT_SECRET');
        this.graphUrl = 'https://graph.microsoft.com/v1.0';
    }
    async getAccessToken() {
        const url = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;
        const response = await axios_1.default.post(url, null, {
            params: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'client_credentials',
                scope: 'https://graph.microsoft.com/.default',
            },
        });
        return response.data.access_token;
    }
    async uploadFile(fileName, fileContent) {
        const accessToken = await this.getAccessToken();
        const siteId = '<SEU_SITE_ID>';
        const driveId = '<SEU_DRIVE_ID>';
        const url = `${this.graphUrl}/sites/${siteId}/drives/${driveId}/root:/${fileName}:/content`;
        const response = await axios_1.default.put(url, fileContent, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/octet-stream',
            },
        });
        return response.data;
    }
    async listFiles() {
        const accessToken = await this.getAccessToken();
        const siteId = '<SEU_SITE_ID>';
        const driveId = '<SEU_DRIVE_ID>';
        const url = `${this.graphUrl}/sites/${siteId}/drives/${driveId}/root/children`;
        const response = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
};
exports.SharePointService = SharePointService;
exports.SharePointService = SharePointService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SharePointService);
//# sourceMappingURL=sharepoint.service.js.map