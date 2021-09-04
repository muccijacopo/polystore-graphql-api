import { Injectable } from '@nestjs/common';
import * as Postgres from 'pg';
import * as MongoDB from 'mongodb';
import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';

@Injectable()
export class DatabaseConnector {
    pgClient: Postgres.Pool;
    mongoClient: MongoDB.Db;
    redisClient: WrappedNodeRedisClient;
    constructor() {}

    onApplicationBootstrap() {
        console.log("Starting Database Connections");
        this.startPostgresConnection();
        this.startMongoConnection();
        this.startRedisConnection();
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
        if (this.mongoClient) return;
        const client = new MongoDB.MongoClient('mongodb://admin:password1!@localhost:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        client.connect()
        .then(() => {
            console.log("MONGODB => OK");
            this.mongoClient = client.db("app")
        })
        .catch((e) => {
            console.log("MongoDB connection error: ", e);
        })
    }

    startRedisConnection() {
        try {
            this.redisClient = createNodeRedisClient();
            console.log("REDIS => OK")
        } catch (e) {
            console.log("REDIS CONNECTION ERROR: ", e);
        }
    }

    getPostgres() {
        return this.pgClient;
    }

    getMongo() {
        return this.mongoClient;
    }

    getRedis() {
        return this.redisClient;
    }
}