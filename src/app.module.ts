import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsResolver } from './authors.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
    autoSchemaFile: true
    }), 
    // TypeOrmModule.forRoot({
    //   type: "postgres",
    //   host: "localhost",
    //   username: "admin",
    //   password: "password1!",
    //   database: "App",
    //   entities: [],
    //   synchronize: true
    // })
],
  controllers: [AppController],
  providers: [AppService, AuthorsResolver],
})
export class AppModule {}
