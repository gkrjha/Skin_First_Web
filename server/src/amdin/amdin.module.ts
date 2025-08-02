import { Module } from '@nestjs/common';
import { AmdinService } from './amdin.service';
import { AmdinController } from './amdin.controller';

@Module({
  providers: [AmdinService],
  controllers: [AmdinController]
})
export class AmdinModule {}
