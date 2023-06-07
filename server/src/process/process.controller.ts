import { ProcessService } from './process.service';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) { }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, '/root/SNNYOLO/npy');
          // cb(null, './uploads')
        },
        filename: (req, file, cb) => {
          console.log(file);
          // You can set your custom file name here
          cb(null, 'photo.jpg');
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: any) {
    // console.log(file)
    return await this.processService.uploadFile(file);
  }

  @Post('/process')
  async processFile() {
    // Handle the uploaded file here or return an appropriate response if needed.
    return await this.processService.processFile();
  }

  @Post('/check')
  async checkStatus() {
    // Handle the uploaded file here or return an appropriate response if needed.
    return await this.processService.checkStatus();
  }

  @Post('/test')
  test() {
    return { hello: 'hifsdflsakfljl' };
  }
}
