import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Track } from "src/tracks/track.model";

@ObjectType()
export class Log {
    @Field() 
    user: string;
    @Field()
    action: string;
    @Field(() => Track)
    track: Track;

    trackId: string;
}