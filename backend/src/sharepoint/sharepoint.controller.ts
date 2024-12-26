/* eslint-disable prettier/prettier */
import { Controller, Post, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharePointService } from './sharepoint.service';

@Controller('sharepoint')
export class SharePointController {
  constructor(private readonly sharePointService: SharePointService) {}

  // Endpoint para upload de arquivo
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = await this.sharePointService.uploadFile(file.originalname, file.buffer);
    return { message: 'Arquivo enviado com sucesso!', data: response };
  }

  // Endpoint para listar arquivos
  @Get('list-files')
  async listFiles() {
    const files = await this.sharePointService.listFiles();
    return { message: 'Lista de arquivos obtida!', data: files };
  }
}
