import { Module } from "@nestjs/common";

import { ArtistService } from "src/artists/artist.service";
import { LogService } from "src/actionLogs/log.service";
import { SharedModule } from "src/shared.module";
import { TrackController } from "./track.controller";
import { TrackResolver } from "./track.resolver";
import { TrackService } from "./track.service";

@Module({
  controllers: [TrackController],
  imports: [SharedModule],
  providers: [TrackResolver, TrackService, ArtistService, LogService],
})
export class TrackModule {}
