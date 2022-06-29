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
  @Index()
  reviewId!: string;

  @Column({
    name: 'user_id',
    nullable: false,
  })
  @Index()
  userId!: string;

  @Column({
    name: 'point',
    nullable: false,
  })
  point!: number;
}
