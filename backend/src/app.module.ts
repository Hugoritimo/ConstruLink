import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvioService } from './sharepoint/EnvioService';
import { File } from './sharepoint/file.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '!0Projetacs',
      database: 'postgres',
      entities: [File],
      synchronize: true,  // Altere para false em produção
    }),
    TypeOrmModule.forFeature([File]),
  ],
  providers: [EnvioService],
})
export class AppModule { }
