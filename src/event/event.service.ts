import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionType } from 'src/common/enum/point.enum';
import { Repository } from 'typeorm';
import { EventDto } from './dto/event.dto';
import { Point } from './entity/Point';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
  ) {}

  async checkActionType(eventDto: EventDto) {
    const { action } = eventDto;

    if (action === ActionType.ADD) {
      await this.addReviewPoint(eventDto);
    } else if (action === ActionType.MOD) {
      this.modReviewPoint(eventDto);
    } else {
    }
  }

  async addReviewPoint(eventDto: EventDto): Promise<void> {
    let point: number = 0;

    const isDuplicatedReview: Point = await this.getPointByUserAndReview(
      eventDto.userId,
      eventDto.reviewId,
    );
    if (isDuplicatedReview !== null) {
      throw new ConflictException('이미 작성한 리뷰입니다');
    }

    if (eventDto.content.length >= 1) point++;
    if (eventDto.attachedPhotoIds.length >= 1) point++;

    const addedPoint = this.pointRepository.create({
      reviewId: eventDto.reviewId,
      userId: eventDto.userId,
      point: point,
    });
    await this.pointRepository.save(addedPoint);
  }

  async modReviewPoint(eventDto: EventDto): Promise<void> {}

  async getPointByUserAndReview(
    userId: string,
    reviewId: string,
  ): Promise<Point> {
    return this.pointRepository.findOne({
      where: {
        userId: userId,
        reviewId: reviewId,
      },
    });
  }
}
