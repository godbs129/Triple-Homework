import { Body, Controller, Get, Post } from '@nestjs/common';
import { Response } from 'src/common/response/Response';
import { EventDto } from './dto/event.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/')
  async addPoint(@Body() eventDto: EventDto) {
    await this.eventService.checkActionType(eventDto);

    return Response.ok('포인트 부여 성공');
  }
}