import { CacheModule, Module } from '@nestjs/common';
import { ProcessModule } from './process/process.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60000 * 60 * 24,
    }),
    ProcessModule,
  ],
})
export class AppModule {}
