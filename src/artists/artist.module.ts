import { Module } from '@nestjs/common';
import { DatabaseConnector } from 'src/database-connector';
import { SharedModule } from 'src/shared.module';
import { ArtistRevolver } from './artist.resolver';
import { ArtistService } from './artist.service';

@Module({
    imports: [SharedModule],
    providers: [ArtistService, ArtistRevolver]
})
export class ArtistModule {}