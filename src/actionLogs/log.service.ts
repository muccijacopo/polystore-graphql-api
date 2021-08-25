import { Injectable } from "@nestjs/common";
import { DatabaseError } from "pg";
import { DatabaseConnector } from "src/database-connector";

@Injectable()
export class LogService {
    async addLog(user: string, action: string, trackId: string) {
        this.connector.getMongo().collection("logs").insertOne({
            user,
            action,
            trackId,
            requestDate: new Date()
        });
    }

    async getLogs() {
        return this.connector.getMongo().collection("logs").find().toArray();
    }

    constructor(private connector: DatabaseConnector) {}
}