import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { Author } from "./models/author.model";

const authorsModel: Author[] = [
  {
    id: 1,
    firstName: "Jacopo",
  },
];

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor() {}

  @Query(() => Author)
  async author(@Args("id", { type: () => Int }) id: number) {
    return authorsModel.find((a) => a.id == id);
  }

  @Query(() => [Author], { name: "authors" })
  async getAuthors() {
    return authorsModel.slice();
  }

  //   @Query(returns => [Author])
  //   async authors() {
  //       return [...authorsModel];
  //   }

  //   @ResolveField()
  //   async posts(@Parent() author: Author) {
  //     const { id } = author;
  //     return this.postsService.findAll({ authorId: id });
  //   }
}
