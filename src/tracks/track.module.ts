import { Module } from "@nestjs/common";

import { ArtistService } from "src/artists/artist.service";
import { SharedModule } from "src/shared.module";
import { TrackController } from "./track.controller";
import { TrackResolver } from "./track.resolver";
import { TrackService } from "./track.service";

@Module({
  controllers: [TrackController],
  imports: [SharedModule],
  providers: [TrackResolver, TrackService, ArtistService],
})
export class TrackModule {}
