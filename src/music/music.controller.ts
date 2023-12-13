import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { MusicService } from './music.service';
import { CreateSongDto } from './dtos/create-song.dto';
import { AddSongToArtistDto, CreateSingerDto } from './dtos/create-singer.dto';
import { CreateAlbumDto } from './dtos/create-album.dto';

@Controller('music')
@ApiTags('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post('song')
  @ApiBody({
    type: CreateSongDto,
    description: 'Data required to create song',
    required: true,
  })
  public async createSong(@Body() dto: CreateSongDto) {
    return await this.musicService.createSong(dto);
  }

  @Put('singer/add-song')
  @ApiBody({
    type: AddSongToArtistDto,
    description: 'Data required to add songs to singer',
    required: true,
  })
  public async addSongsToArtist(@Body() dto: AddSongToArtistDto) {
    return await this.musicService.addSongsToSinger(dto);
  }

  @Post('singer')
  @ApiBody({
    type: CreateSingerDto,
    description: 'Data required to create singer',
    required: true,
  })
  public async createSinger(@Body() dto: CreateSingerDto) {
    return await this.musicService.createSinger(dto);
  }

  @Post('album')
  @ApiBody({
    type: CreateAlbumDto,
    description: 'Data required to create album',
    required: true,
  })
  public async createAlbum(@Body() dto: CreateAlbumDto) {
    return await this.musicService.createAlbum(dto);
  }

  @Get('singer/all-songs')
  public async getAllArtistSongs(@Query('artistId') artistId: number) {
    return await this.musicService.getAllArtistSongs(artistId);
  }

  @Get('album/all-songs')
  public async getAllAlbumSongs(@Query('albumId') albumId: number) {
    return await this.musicService.getAllAlbumSongs(albumId);
  }
}
