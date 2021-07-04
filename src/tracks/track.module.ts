import { Module } from "@nestjs/common";
import { DatabaseConnector } from "src/database-connector";
import { SharedModule } from "src/shared.module";
import { TrackResolver } from "./track.resolver";
import { TrackService } from "./track.service";

@Module({
  imports: [SharedModule],
  providers: [TrackResolver, TrackService],
})
export class TrackModule {}
