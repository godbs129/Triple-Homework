import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    } else {
      await this.delReview(eventDto);
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

    const isFirstReviewByPlace: Point = await this.getPointLogByPlace(
      eventDto.placeId,
    );

    if (isFirstReviewByPlace === null) point++;

    if (eventDto.content.length >= 1) point++;
    if (eventDto.attachedPhotoIds.length >= 1) point++;

    const addedPoint = this.pointRepository.create({
      reviewId: eventDto.reviewId,
      userId: eventDto.userId,
      point: point,
      content: eventDto.content.length >= 1 ? true : false,
      photo: eventDto.attachedPhotoIds.length >= 1 ? true : false,
      placeId: eventDto.placeId,
    });
    await this.pointRepository.save(addedPoint);
  }

  async delReview(eventDto: EventDto): Promise<void> {
    const pointLog: Point = await this.getPointByUserAndReview(
      eventDto.userId,
      eventDto.reviewId,
    );

    if (pointLog === null) {
      throw new NotFoundException('포인트가 존재하지 않습니다');
    }

    await this.pointRepository.remove(pointLog);
  }

  async getPointByUserAndReview(
    userId: string,
    reviewId: string,
  ): Promise<Point | null> {
    return this.pointRepository.findOne({
      where: {
        userId: userId,
        reviewId: reviewId,
      },
    });
  }

  async getPointLogByPlace(placeId: string): Promise<Point | null> {
    return this.pointRepository.findOne({
      where: {
        placeId: placeId,
      },
    });
  }
}
