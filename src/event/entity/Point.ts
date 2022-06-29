import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('point')
export class Point {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id!: string;

  @Column({
    name: 'review_id',
    nullable: false,
  })
  @Index('idx_review_id')
  reviewId!: string;

  @Column({
    name: 'user_id',
    nullable: false,
  })
  @Index('idx_user_id')
  userId!: string;

  @Column({
    name: 'point',
    nullable: false,
  })
  point!: number;

  @Column({
    name: 'content',
    nullable: false,
  })
  content!: boolean;

  @Column({
    name: 'photo',
    nullable: false,
  })
  photo!: boolean;

  @Column({
    name: 'place_id',
    nullable: false,
  })
  placeId!: string;
}
