import { Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import { TrackService } from "src/tracks/track.service";
import { Log } from "./log.model";
import { LogService } from "./log.service";

@Resolver(() => Log)
export class LogResolver {
    @Query(() => [Log])
    logs() {
        return this.logService.getLogs();
    }

    @ResolveField()
    track(@Parent() log: Log) {
        return this.trackService.findTrackById(log.trackId);
    }


    constructor(private logService: LogService, private trackService: TrackService) {}
}
