import { Module } from "@nestjs/common";
import { TrackResolver } from "./track.resolver";
import { TrackService } from "./track.service";

@Module({
  providers: [TrackResolver, TrackService],
})
export class TrackModule {}
