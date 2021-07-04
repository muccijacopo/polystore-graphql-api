import { Args, Field, InputType, Int, Mutation, Resolver } from "@nestjs/graphql";
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

    constructor(private artistService: ArtistService) {}

}