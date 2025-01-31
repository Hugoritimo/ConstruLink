import { SharePointService } from './sharepoint.service';
export declare class SharePointController {
    private readonly sharePointService;
    constructor(sharePointService: SharePointService);
    uploadFile(file: Express.Multer.File): Promise<{
        message: string;
        data: any;
    }>;
    listFiles(): Promise<{
        message: string;
        data: any;
    }>;
}
