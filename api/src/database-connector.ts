import { Injectable } from '@nestjs/common';
import * as Postgres from 'pg';
import * as MongoDB from 'mongodb';
import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';
import { envVariables } from 'env';
import { env } from 'process';

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
            host: envVariables.postgresHost,
            user: envVariables.postgresUser,
            password: envVariables.postgresPassword,
            database: envVariables.postgresDB,
        })
        console.log("POSTGRES => OK")
    }

    startMongoConnection() {
        if (this.mongoClient) return;
        const client = new MongoDB.MongoClient(envVariables.mongoURI, {
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
            this.redisClient = createNodeRedisClient({ host: envVariables.redistHost });
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