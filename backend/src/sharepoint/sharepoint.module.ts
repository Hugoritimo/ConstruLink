/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SharePointService } from './sharepoint.service';
import { SharePointController } from './sharepoint.controller';

@Module({
  controllers: [SharePointController],
  providers: [SharePointService],
})
export class SharePointModule {}
