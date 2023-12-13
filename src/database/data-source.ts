import { getDataSourceOptions, readEnv } from 'src/database/data-source-utils';
import { AlbumEntity, SingerEntity, SongEntity } from './entities';

export const defaultDataSource = getDataSourceOptions(readEnv, () => ({
  entities: [SongEntity, SingerEntity, AlbumEntity],
}));
