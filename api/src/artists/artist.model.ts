import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Track } from "src/tracks/track.model";

@ObjectType()
export class Artist {
    @Field()
    id: string;
    @Field()
    name: string;
    @Field(() => Int)
    popularity: number;
    @Field(() => Int)
    followers: number;
    @Field(() => [Track]) 
    tracks: Track[];
}