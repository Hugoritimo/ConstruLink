import { Controller, Post, Body, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) { }

  @Post('generate')
  async generatePdf(@Body() data: any, @Res() res: Response) {
    const filePath = await this.pdfService.generateRdo(data);

    // Enviar o arquivo gerado como resposta
    res.download(filePath, (err) => {
      if (err) {
        console.error('Erro ao enviar o arquivo:', err);
        res.status(500).send('Erro ao gerar o PDF');
      }
    });
  }
}
