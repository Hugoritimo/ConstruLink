import { Controller, Post, Body, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('pdf') // Base URL do controller
export class PdfController {
    constructor(private readonly pdfService: PdfService) { }

    @Post('generate') // Rota completa: /pdf/generate
    async generatePdf(@Body() data: any, @Res() res: Response) {
        try {
            const filePath = await this.pdfService.generateRdo(data);
            res.download(filePath, (err) => {
                if (err) {
                    console.error('Erro ao enviar o arquivo:', err);
                    res.status(500).send('Erro ao gerar o PDF');
                }
            });
        } catch (err) {
            console.error('Erro ao gerar o PDF:', err);
            res.status(500).send('Erro ao gerar o PDF');
        }
    }
}
