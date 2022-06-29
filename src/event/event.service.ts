import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from './entity/Point';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private readonly postRepository: Repository<Point>,
  ) {}
}
