import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsResolver } from './authors.resolver';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: true
  })],
  controllers: [AppController],
  providers: [AppService, AuthorsResolver],
})
export class AppModule {}
