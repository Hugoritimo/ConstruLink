/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
    async generatePdfFromHtml(htmlContent: string): Promise<Buffer> {
        // Inicializa o navegador Puppeteer
        const browser = await puppeteer.launch({
            headless: true,
        });

        try {
            const page = await browser.newPage();

            // Define o conteúdo HTML
            await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

            // Gera o PDF e retorna como Uint8Array
            const pdfUint8Array = await page.pdf({
                format: 'A4',
                printBackground: true,
            });

            // Converte Uint8Array para Buffer explicitamente
            const pdfBuffer: Buffer = Buffer.from(pdfUint8Array);

            return pdfBuffer;
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            throw new Error('Falha ao gerar PDF');
        } finally {
            await browser.close();
        }
    }
}
