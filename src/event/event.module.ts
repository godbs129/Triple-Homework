import { Module } from '@nestjs/common';
import { PointService } from './event.service';
import { PointController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entity/Point';

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  providers: [PointService],
  controllers: [PointController],
})
export class PointModule {}
