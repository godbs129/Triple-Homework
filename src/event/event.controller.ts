import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Response } from 'src/common/response/Response';
import { EventDto } from './dto/event.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/')
  async addPoint(@Body() eventDto: EventDto): Promise<Response> {
    await this.eventService.checkActionType(eventDto);

    return Response.ok('마일리지 적립 이벤트 발생');
  }

  @Get('/')
  async getPoint(@Query('userId') userId: string): Promise<Response<number>> {
    const point: number = await this.eventService.getPointByUserId(userId);

    return Response.ok('포인트 조회 성공', point);
  }
}
