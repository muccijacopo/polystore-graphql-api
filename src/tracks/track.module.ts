import { Module } from "@nestjs/common";

import { ArtistService } from "src/artists/artist.service";
import { SharedModule } from "src/shared.module";
import { TrackResolver } from "./track.resolver";
import { TrackService } from "./track.service";

@Module({
  imports: [SharedModule],
  providers: [TrackResolver, TrackService, ArtistService],
})
export class TrackModule {}
