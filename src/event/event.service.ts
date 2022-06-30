import {
  ConflictException,
  ForbiddenException,
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
      await this.modReviewPoint(eventDto);
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
      increase: true,
      userId: eventDto.userId,
      point: point,
      content: eventDto.content.length >= 1 ? true : false,
      photo: eventDto.attachedPhotoIds.length >= 1 ? true : false,
      placeId: eventDto.placeId,
    });
    await this.pointRepository.save(addedPoint);
  }

  async modReviewPoint(eventDto: EventDto): Promise<void> {
    const pointLog: Point = await this.getPointByUserAndReview(
      eventDto.userId,
      eventDto.reviewId,
    );

    let modifyPointLog: Point;
    delete pointLog.id;
    if (!pointLog.photo) {
      if (eventDto.attachedPhotoIds.length >= 1) {
        modifyPointLog = this.pointRepository.create({
          ...pointLog,
          increase: true,
          point: 1,
        });
      }
    }

    if (pointLog.photo) {
      if (eventDto.attachedPhotoIds.length < 1) {
        modifyPointLog = this.pointRepository.create({
          ...pointLog,
          increase: false,
          point: 1,
        });
      }
    }

    await this.pointRepository.save(modifyPointLog);
  }

  async delReview(eventDto: EventDto): Promise<void> {
    const pointLog: Point = await this.getPointByUserAndReview(
      eventDto.userId,
      eventDto.reviewId,
    );

    const leftPoint: number = await this.checkPointLeft(
      eventDto.userId,
      eventDto.reviewId,
    );

    if (leftPoint < 1) {
      throw new ForbiddenException('남은 포인트가 없습니다');
    }

    delete pointLog.id;
    const minusPointLog: Point = this.pointRepository.create({
      ...pointLog,
      point: leftPoint,
      increase: false,
    });
    await this.pointRepository.save(minusPointLog);
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

  async checkPointLeft(userId: string, reviewId: string): Promise<number> {
    const pointLogs: Point[] = await this.pointRepository.find({
      where: {
        userId: userId,
        reviewId: reviewId,
      },
    });

    let leftPoint: number = 0;
    pointLogs.forEach((point) => {
      if (!point.increase) {
        leftPoint -= point.point;
      } else {
        leftPoint += point.point;
      }
    });

    console.log(leftPoint);
    return leftPoint;
  }
}
