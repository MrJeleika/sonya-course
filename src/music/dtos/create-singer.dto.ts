import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateSingerDto {
  @ApiProperty({
    type: String,
    nullable: false,
    example: 'IVOXYGEN',
    description: 'Name of the singer',
  })
  @IsString()
  name: string;
}

export class AddSongToArtistDto {
  @ApiProperty({
    type: Number,
    nullable: false,
    required: true,
    example: '5',
    description: 'ID of the singer',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: [Number],
    nullable: false,
    required: true,
    description: 'Ids of the songs associated with the singer',
    isArray: true,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  songIds: number[];
}
