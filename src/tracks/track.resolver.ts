import {
  Resolver,
  Query,
  Mutation,
  Args,
  InputType,
  Field,
  Int,
  GraphQLISODateTime,
  ResolveField,
  Parent
} from "@nestjs/graphql";
import { StitchingInfo } from "graphql-tools";
import { Artist } from "src/artists/artist.model";
import { ArtistService } from "src/artists/artist.service";

import { Track } from "./track.model";
import { TrackService } from "./track.service";

@InputType()
export class AddTrackInput {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field(() => Int)
  popularity: number;
  @Field(() => Int)
  duration: number;
  @Field(() => Int)
  explicit: number;
  @Field()
  release_date: string;
  @Field()
  artist_id: string;
}

@Resolver(() => Track)
export class TrackResolver {
  @Query(() => [Track])
  tracks(@Args('q', { nullable: true }) q: string) {
    return this.trackService.searchByName(q);
  }

  @Query(() => [Track])
  topPlayedTracks() {
    return this.trackService.getTopPlayedTracks();
  }

  @ResolveField()
  async artist(@Parent() track: Track) {
    return this.artistService.findArtistById(track.artist_id)
  }

  @Mutation(() => Track)
  addTrack(@Args("data") data: AddTrackInput) {
    return this.trackService.saveNewTrack(data);
  }

  constructor(private trackService: TrackService, private artistService: ArtistService) {}
}
