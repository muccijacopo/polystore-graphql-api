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
        console.log(process.env.MONGO_URI)
        this.startPostgresConnection();
        this.startMongoConnection();
        this.startRedisConnection();
    }

    startPostgresConnection() {
        if (this.pgClient) return;
        this.pgClient = new Postgres.Pool({
            host: process.env.POSTGRES_HOST,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        })
        console.log("POSTGRES => OK")
    }

    startMongoConnection() {
        if (this.mongoClient) return;
        const client = new MongoDB.MongoClient(process.env.MONGO_URI, {
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
            this.redisClient = createNodeRedisClient({ host: process.env.REDIS_HOST });
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