import { Module } from "@nestjs/common";
import { DatabaseConnector } from "./database-connector";

@Module({
    providers: [DatabaseConnector],
    exports: [DatabaseConnector]
})
export class SharedModule {}