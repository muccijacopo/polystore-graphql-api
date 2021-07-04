import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Track {
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
}
