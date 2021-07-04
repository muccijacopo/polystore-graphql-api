import { Module } from '@nestjs/common';
import { DatabaseConnector } from 'src/database-connector';
import { ArtistRevolver } from './artist.resolver';
import { ArtistService } from './artist.service';

@Module({
    providers: [ArtistService, ArtistRevolver, DatabaseConnector]
})
export class ArtistModule {}