import { Module } from "@nestjs/common";
import { DatabaseConnector } from "src/database-connector";
import { TrackResolver } from "./track.resolver";
import { TrackService } from "./track.service";

@Module({
  providers: [TrackResolver, TrackService, DatabaseConnector],
})
export class TrackModule {}
