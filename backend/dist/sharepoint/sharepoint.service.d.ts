import { ConfigService } from '@nestjs/config';
export declare class SharePointService {
    private readonly configService;
    private readonly tenantId;
    private readonly clientId;
    private readonly clientSecret;
    private readonly graphUrl;
    constructor(configService: ConfigService);
    private getAccessToken;
    uploadFile(fileName: string, fileContent: Buffer): Promise<any>;
    listFiles(): Promise<any>;
}
