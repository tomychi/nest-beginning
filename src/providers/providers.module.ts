import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { HttpCustomService } from './http/http.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [HttpCustomService],
  exports: [HttpCustomService, HttpModule],
})
export class ProvidersModule {}
