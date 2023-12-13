import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: 'Ghost kid',
    description: 'Name of the song.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: 'https://spotify.com/1',
    description: 'Link to the song',
  })
  @IsString()
  link: string;

  @ApiProperty({
    type: Number,
    nullable: false,
    required: true,
    example: 1,
    description: 'ID of the artist associated with the song.',
  })
  @IsNumber()
  artistId: number;

  @ApiProperty({
    type: [Number],
    nullable: true,
    example: [1, 2],
    description: 'IDs of the albums associated with the song.',
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayUnique()
  albumIds: number[];
}
