import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entity/Point';

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  providers: [EventService],
  controllers: [EventController],
})
export class PointModule {}
