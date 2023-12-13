import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsNumber, IsString } from 'class-validator';
import { CreateSongDto } from './create-song.dto';

export class CreateAlbumDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: 'Album Name',
    description: 'Name of the album',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: [CreateSongDto],
    nullable: false,
    example: [1, 2],
    description: 'Songs associated with the album.',
    isArray: true,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayUnique()
  songs: CreateSongDto[];
}
