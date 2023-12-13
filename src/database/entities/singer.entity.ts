import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SongEntity } from './song.entity';

@Entity()
export class SingerEntity extends BaseEntity {
  @ApiProperty({
    type: Number,
    nullable: false,
    example: 2,
    description: 'Unique id the singer',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    nullable: false,
    example: 'IVOXYGEN',
    description: 'Name of the singer',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: SongEntity,
    nullable: true,
    description: 'Songs associated with the singer',
    isArray: true,
  })
  @OneToMany(() => SongEntity, (song) => song.singer, {
    eager: true,
    cascade: true,
  })
  songs: SongEntity[];
}
