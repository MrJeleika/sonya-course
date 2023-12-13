// album.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SongEntity } from './song.entity';

@Entity()
export class AlbumEntity extends BaseEntity {
  @ApiProperty({
    type: Number,
    nullable: false,
    example: 2,
    description: 'Unique id of the album',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    nullable: false,
    example: 'Album Name',
    description: 'Name of the album',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: SongEntity,
    nullable: false,
    description: 'Songs associated with the album',
    isArray: true,
  })
  @OneToMany(() => SongEntity, (song) => song.album, {
    eager: true,
    cascade: true,
  })
  songs: SongEntity[];
}
