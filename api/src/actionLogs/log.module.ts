import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared.module";
import { TrackService } from "src/tracks/track.service";
import { LogResolver } from "./log.resolver";
import { LogService } from "./log.service";

@Module({
    imports: [SharedModule],
    providers: [LogService, LogResolver, TrackService]
})
export class LogModule {}