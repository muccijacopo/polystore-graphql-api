import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Track } from "src/tracks/track.model";

@ObjectType()
export class Log {
    @Field() 
    user: string;
    @Field()
    action: string;
    @Field({ nullable: true })
    requestDate: Date;
    @Field(() => Track)
    track: Track;

    trackId: string;
}