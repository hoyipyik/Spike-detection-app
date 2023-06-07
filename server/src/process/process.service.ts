import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { Cache } from 'cache-manager';
import { backmsg } from 'src/tools/tools';

@Injectable()
export class ProcessService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  private pythonProcess: ChildProcessWithoutNullStreams;
  private pythonProcess2: ChildProcessWithoutNullStreams;
  async checkStatus() {
    const data = await this.valueGetHandler();
    return backmsg(data.finished, 'status get', data);
  }

  async processFile() {
    this.pythonProcess = spawn('/root/miniconda3/envs/insist/bin/python', ['/root/SNNYOLO/img2spike.py']);
    await this.valueSetHandler(false, '', 'start p1');
    this.pythonProcess.on('close', async (code) => {
      if (code === 0) {
        this.pythonProcess2 = spawn('/root/miniconda3/envs/insist/bin/python', ['/root/SNNYOLO/SNNdetect.py']);
        await this.valueSetHandler(false, '', 'start p2');
        this.pythonProcess2.on('close', async (code) => {
          if (code === 0) {
            await this.valueSetHandler(true, 'http://localhost:7896/edited/photo1.jpg_http://localhost:7896/edited/photo2.jpg', 'finish');
          }
        })
      }
    })
    return backmsg(true, 'start')
  }

  async valueSetHandler(
    finishFlag: boolean,
    url = '',
    msg = '',
  ) {
    const key: string = 'data'
    const value = {
      finished: finishFlag,
      msg: msg,
      url: url,
    };
    const storeValue: string = JSON.stringify(value);
    await this.cacheManager.set(key, storeValue);
  }

  async valueGetHandler() {
    const key: string = 'data'
    try {
      const storedValue: string = await this.cacheManager.get(key);
      const value = JSON.parse(storedValue);
      return value;
    } catch (error) {
      return undefined;
    }
  }


  uploadFile(file: any) {
    return backmsg(true, 'upload success', {
      filename: 'image.jpg',
      url: 'http://localhost:7896/uploads/photo.jpg',
    });
  }
}
