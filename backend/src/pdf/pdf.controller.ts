import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
    constructor(private readonly pdfService: PdfService) { }

    @Post('generate')
    async generatePdf(
        @Res() res: Response,
        @Body() body: { htmlContent: string },
    ) {
        try {
            // Valida se o HTML foi enviado
            if (!body.htmlContent) {
                return res.status(400).json({ message: 'HTML content is required' });
            }

            // Gera o PDF usando o serviço
            const pdfBuffer = await this.pdfService.generatePdfFromHtml(
                body.htmlContent,
            );

            // Configura os headers do PDF
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="relatorio-diario.pdf"',
            });

            // Retorna o PDF
            res.send(pdfBuffer);
        } catch (error) {
            console.error('Erro no controller:', error);
            res.status(500).json({ message: 'Erro ao gerar o PDF' });
        }
    }
}
