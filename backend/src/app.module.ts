/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfModule } from './pdf/pdf.module';
import { SharePointController } from './sharepoint/sharepoint.controller';
import { SharePointService } from './sharepoint/sharepoint.service'; // Adicionado o serviço SharePoint

@Module({
  imports: [PdfModule], // Módulos importados
  controllers: [AppController, SharePointController], // Controladores corrigidos
  providers: [AppService, SharePointService], // Adicionado SharePointService
})
export class AppModule {}
