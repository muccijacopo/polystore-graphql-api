import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { ArtistModule } from "./artists/artist.module";
import { LogModule } from "./actionLogs/log.module";
import { TrackModule } from "./tracks/track.module";
import { KafkaService } from "./kafka.service";

console.log("node env", process.env.NODE_ENV)

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [process.env.NODE_ENV == 'production' ? '.env' : '.env.development']
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TrackModule,
    ArtistModule,
    LogModule
  ],
  controllers: [],
  providers: [KafkaService],
})
export class AppModule {
  
}
