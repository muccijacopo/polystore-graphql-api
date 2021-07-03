import { Module } from "@nestjs/common";
import { TrackResolver } from "./track.resolver";
import { TracksService } from "./tracks.service";

@Module({
    providers: [TrackResolver, TracksService]
})
export class TrackModule {}