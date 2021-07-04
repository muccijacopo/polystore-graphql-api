import { Field, Int, ObjectType } from "@nestjs/graphql";

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
}