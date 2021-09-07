import { Args, Field, InputType, Int, Query, Mutation, Resolver, ResolveField, Parent } from "@nestjs/graphql";
import { TrackService } from "src/tracks/track.service";
import { Artist } from "./artist.model";
import { ArtistService } from "./artist.service";

@InputType()
export class AddArtistInput {
    @Field()
    id: string;
    @Field()
    name: string;
    @Field(() => Int) 
    followers: number;
    @Field(()=> Int)
    popularity: number;
}

@Resolver(() => Artist)
export class ArtistRevolver {
    @Mutation(() => Artist)
    addArtist(@Args("data") data: AddArtistInput) {
        return this.artistService.addArtist(data);
    }

    @Query(() => [Artist])
    artists(@Args('limit', { nullable: true }) limit: number) {
        return this.artistService.findAllArtists(limit);
    }

    @ResolveField()
    tracks(@Parent() artist: Artist, @Args('limit', { nullable: true }) limit: number) {
        return this.trackService.findTracksByArtist(artist.id, limit);
    }


    constructor(private artistService: ArtistService, private trackService: TrackService) {}

}