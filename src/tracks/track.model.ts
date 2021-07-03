import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Track {
    @Field(() => Int)
    id: number;
    @Field()
    name: string;
}
