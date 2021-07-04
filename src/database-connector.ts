import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool, Client } from 'pg';

@Injectable()
export class DatabaseConnector implements OnModuleInit {
    pool: Pool = null;
    constructor() {}

    onModuleInit() {
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
    }

    getPostgres() {
        return this.pool;
    }
}