import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ActionType } from 'src/common/enum/point.enum';

export class EventDto {
  @IsNotEmpty()
  @IsString()
  type!: string;

  @IsNotEmpty()
  @IsEnum(ActionType)
  action!: ActionType;

  @IsNotEmpty()
  @IsString()
  reviewId!: string;

  @IsString()
  content!: string;

  @IsArray()
  attachedPhotoIds!: string[];

  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  placeId!: string;
}
