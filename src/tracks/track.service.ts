import { Injectable } from "@nestjs/common";
import { DatabaseConnector } from "src/database-connector";
import { Track } from "./track.model";
import { AddTrackInput } from "./track.resolver";

@Injectable()
export class TrackService {
  tracks: Track[] = [];

  async searchByName(filter: string) {
    if (filter) {
      const query = "SELECT * FROM tracks WHERE name ILIKE $1 ORDER BY name ASC";
      const res = await this.connector
        .getPostgres()
        .query(query, ["%" + filter + "%"]);
      return res.rows;
    } else {
      const res = await this.connector
        .getPostgres()
        .query("SELECT * FROM tracks ORDER BY name ASC");
      return res.rows;
    }
  }

  async saveNewTrack({ id,  name, popularity, duration, explicit, release_date, artist_id}: AddTrackInput) {
    const res = await this.connector
      .getPostgres()
      .query(
        "INSERT INTO tracks (id, name, popularity, duration, explicit, release_date, artist_id) \
        VALUES ($1, $2, $3, $4, $5, $6, $7) \
        RETURNING *",
        [id, name, popularity, duration, explicit, release_date, artist_id],
      );
    return res.rows[0] as Track;
  }

  constructor(private connector: DatabaseConnector) {}
}
