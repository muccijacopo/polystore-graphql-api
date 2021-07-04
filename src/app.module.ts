import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

import { ArtistModule } from "./artists/artist.module";
import { TrackModule } from "./tracks/track.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: "postgres",
    //   host: "localhost",
    //   username: "admin",
    //   password: "password1!",
    //   database: "App",
    //   entities: [],
    //   synchronize: true,
    // }),
    TrackModule,
    ArtistModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
