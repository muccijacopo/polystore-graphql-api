import { Module } from '@nestjs/common';
import { DatabaseConnector } from 'src/database-connector';
import { SharedModule } from 'src/shared.module';
import { TrackService } from 'src/tracks/track.service';
import { ArtistRevolver } from './artist.resolver';
import { ArtistService } from './artist.service';

@Module({
    imports: [SharedModule],
    providers: [ArtistService, ArtistRevolver, TrackService]
})
export class ArtistModule {}