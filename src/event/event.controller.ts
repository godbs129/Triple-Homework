import { Controller, Get, Post } from '@nestjs/common';
import { PointService } from './event.service';

@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  // @Post('/')
  // async;
}
