import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Equal } from 'typeorm';
import { AddSongToArtistDto, CreateSingerDto } from './dtos/create-singer.dto';
import { AlbumEntity, SingerEntity, SongEntity } from 'src/database';
import { CreateSongDto } from './dtos/create-song.dto';
import { CreateAlbumDto } from './dtos/create-album.dto';

@Injectable()
export class MusicService {
  constructor(private readonly dataSource: DataSource) {}

  public async createSinger(dto: CreateSingerDto) {
    return await this.dataSource.manager.transaction((manager) => {
      const singersRepo = manager.getRepository(SingerEntity);
      return singersRepo.save(singersRepo.create({ ...dto }));
    });
  }

  public async createSong(dto: CreateSongDto) {
    return await this.dataSource.manager.transaction(async (manager) => {
      const songsRepo = manager.getRepository(SongEntity);
      const singer = await manager.findOne(SingerEntity, {
        where: { id: dto.artistId },
      });

      if (!singer)
        throw new NotFoundException(
          `Singer with ID ${dto.artistId} not found.`,
        );

      return songsRepo.save(songsRepo.create({ ...dto, singer }));
    });
  }

  public async createAlbum(dto: CreateAlbumDto) {
    return await this.dataSource.manager.transaction(async (manager) => {
      const albumsRepo = manager.getRepository(AlbumEntity);
      const songsRepo = manager.getRepository(SongEntity);

      const songsToAdd = await songsRepo.findByIds(dto.songs);

      const newAlbum = albumsRepo.create({ ...dto, songs: songsToAdd });

      for (const song of songsToAdd) {
        song.album = newAlbum;
      }

      await manager.save([...songsToAdd, newAlbum]);
      return 'Created';
    });
  }

  public async addSongsToSinger({ id, songIds }: AddSongToArtistDto) {
    return await this.dataSource.manager.transaction(async (manager) => {
      const singersRepo = manager.getRepository(SingerEntity);

      const singer = await singersRepo.findOne({ where: { id } });

      if (!singer) {
        throw new NotFoundException(`Singer with ID ${id} not found.`);
      }

      const songsRepo = manager.getRepository(SongEntity);
      const songsToAdd = await songsRepo.findByIds(songIds);

      for (const song of songsToAdd) {
        song.singer = singer;
      }
      singer.songs = [...singer.songs, ...songsToAdd];
      await manager.save([...songsToAdd, singer]);

      return 'Created';
    });
  }

  public async getAllArtistSongs(id: number) {
    const singer = await this.dataSource.manager.findOne(SingerEntity, {
      where: { id },
    });
    if (!singer) throw new NotFoundException(`Singer with ID ${id} not found.`);

    return await this.dataSource.manager.find(SongEntity, {
      where: { singer: { id } },
    });
  }

  public async getAllAlbumSongs(id: number) {
    const album = await this.dataSource.manager.findOne(AlbumEntity, {
      where: { id },
    });

    if (!album) throw new NotFoundException(`Album with ID ${id} not found.`);

    return await this.dataSource.manager.find(SongEntity, {
      where: { album: { id } },
    });
  }
}
