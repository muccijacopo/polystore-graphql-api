import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Postgres from 'pg';
import * as MongoDB from 'mongodb';

@Injectable()
export class DatabaseConnector {
    pgClient: Postgres.Pool;
    mognoClient: MongoDB.Db;
    constructor() {}

    onApplicationBootstrap() {
        console.log("Starting Database Connections");
        this.startPostgresConnection();
        this.startMongoConnection();
    }

    startPostgresConnection() {
        if (this.pgClient) return;
        this.pgClient = new Postgres.Pool({
            host: "localhost",
            user: "admin",
            password: "password1!",
            database: "App",
        })
        console.log("POSTGRES => OK")
    }

    startMongoConnection() {
        if (this.mognoClient) return;
        const client = new MongoDB.MongoClient('mongodb://admin:password1!@localhost:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        client.connect()
        .then(() => {
            console.log("MONGODB => OK");
            this.mognoClient = client.db("app")
        })
        .catch((e) => {
            console.log("MongoDB connection error: ", e);
        })
    }

    getPostgres() {
        return this.pgClient;
    }

    getMongo() {
        return this.mognoClient;
    }
}