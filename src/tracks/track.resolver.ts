import { Resolver, Query, Mutation, Args, InputType, Field, Int } from "@nestjs/graphql";

import { Track } from "./track.model";
import { TracksService } from "./tracks.service";

@InputType()
export class AddTrackInput {
    @Field()
    name: string;
}

@Resolver(() => Track)
export class TrackResolver {
    @Query(() => [Track])
    tracks() {
        return this.trackService.tracks.slice();
    }

    @Mutation(() => Track)
    addTrack(@Args('data') data: AddTrackInput) {
        return this.trackService.saveNewTrack(data);
    }

    constructor(private trackService: TracksService) {}

}