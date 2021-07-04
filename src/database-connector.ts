import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool, Client } from 'pg';

@Injectable()
export class DatabaseConnector {
    pool: Pool = null;
    constructor() {}

    onApplicationBootstrap() {
        console.log("Starting Database Connections");
        this.startPostgresConnection();
    }

    startPostgresConnection() {
        this.pool = new Pool({
            host: "localhost",
            user: "admin",
            password: "password1!",
            database: "App",
        })
        console.log("POSTGRES => OK")
    }

    getPostgres() {
        return this.pool;
    }
}