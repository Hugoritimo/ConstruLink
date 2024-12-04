import { Module } from '@nestjs/common';
import { PdfController } from './pdf/pdf.controller';
import { PdfService } from './pdf/pdf.service';

@Module({
  imports: [], // Sem dependências externas por enquanto
  controllers: [PdfController], // Registrar o PdfController
  providers: [PdfService], // Registrar o PdfService
})
export class AppModule { }
