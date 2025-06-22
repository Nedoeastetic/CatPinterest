import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CatsController } from './cats.controller';

@Module({
  imports: [HttpModule],
  controllers: [CatsController]
})
export class CatsModule {}