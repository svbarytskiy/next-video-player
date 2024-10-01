import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as multer from 'multer';
import * as path from 'path';

@Controller('/api/upload')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  @UseInterceptors(FileInterceptor('video', {
    storage: multer.diskStorage({
      destination: './uploads/original',
      filename: (req, file, cb) => {
        const UniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const fileExtName = path.extname(file.originalname)
        cb(null, `${UniqueSuffix}${fileExtName}`)
      }
    })
  })) // 'file' is the field name in the form
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.processVideo(file);
  }
}
