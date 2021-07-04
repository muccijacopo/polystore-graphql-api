import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Artist } from "src/artists/artist.model";

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
  @Field(() => Artist)
  artist: Artist;
  
  artist_id: string;
}
