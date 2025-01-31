import { Response } from 'express';
import { PdfService } from './pdf.service';
export declare class PdfController {
    private readonly pdfService;
    constructor(pdfService: PdfService);
    generatePdf(res: Response, body: {
        htmlContent: string;
    }): Promise<Response<any, Record<string, any>>>;
}
