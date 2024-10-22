import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service'; // Criaremos esse serviço para o Prisma

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService], // Incluímos o PrismaService nos providers
})
export class AppModule { }
