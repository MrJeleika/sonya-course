import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SingerEntity } from './singer.entity';
import { AlbumEntity } from './album.entity';

@Entity()
export class SongEntity extends BaseEntity {
  @ApiProperty({
    type: Number,
    nullable: false,
    example: 2,
    description: 'Unique id the song',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    nullable: false,
    example: 'Ghost kid',
    description: 'Name of the song',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
    nullable: false,
    example: 'https://spotify.com/1',
    description: 'Link to the song',
  })
  @Column()
  link: string;

  @ApiProperty({
    type: SingerEntity,
    nullable: false,
    description: 'Singer associated with the song',
  })
  @ManyToOne(() => SingerEntity, (singer) => singer.songs)
  singer: SingerEntity;

  @ApiProperty({
    type: AlbumEntity,
    nullable: true,
    description: 'Album associated with the song',
  })
  @ManyToOne(() => AlbumEntity, (album) => album.songs)
  album: SingerEntity;
}
