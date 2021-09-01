import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

import { ArtistModule } from "./artists/artist.module";
import { LogModule } from "./actionLogs/log.module";
import { TrackModule } from "./tracks/track.module";
import { KafkaService } from "./kafka.service";

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
    ArtistModule,
    LogModule
  ],
  controllers: [],
  providers: [KafkaService],
})
export class AppModule {
  
}
