import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { DatabaseModule } from 'src/database';

@Module({
  controllers: [MusicController],
  providers: [MusicService],
  imports: [DatabaseModule],
})
export class MusicModule {}
