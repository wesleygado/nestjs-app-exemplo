import { Module } from '@nestjs/common';
import { DiaristaModule } from './diarista/diarista.module';

@Module({
  imports: [DiaristaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
