import { Injectable } from "@nestjs/common";
import { DatabaseConnector } from "src/database-connector";
import { LogService } from "src/actionLogs/log.service";
import { Track } from "./track.model";
import { AddTrackInput } from "./track.resolver";
import { TrackModule } from "./track.module";

@Injectable()
export class TrackService {
  tracks: Track[] = [];

  async searchByName(filter: string) {
    this.connector.getMongo().collection("searches").insertOne({
      user: "Jacopo",
      query: filter
    });
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

  async findTracksByArtist(artistId: string) {
    const res = await this.connector.getPostgres()
    .query("SELECT * FROM tracks WHERE artist_id = $1", [artistId]);
    return res.rows as Track[];
  }

  async findTrackById(trackId: string): Promise<Track> {
    console.log(trackId)
      const cacheResponse = await this.connector.getRedis().get(`track:${trackId}`);
      if (cacheResponse) return JSON.parse(cacheResponse) as Track;
      const freshResponse = await this.connector.getPostgres().query("SELECT * FROM tracks WHERE id = $1", [trackId])
      if (!freshResponse?.rows.length) return;
      this.connector.getRedis().setex(`track:${trackId}`, 30, JSON.stringify(freshResponse.rows[0]))
      return freshResponse.rows[0] as Track;
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

  async playTrack(trackId: string) {
    const res = await this.connector.getPostgres()
    .query("UPDATE tracks SET played = played + 1 WHERE id = $1 RETURNING *", [trackId]);
    const updatedTrack = res.rows[0] as Track;
    if (updatedTrack) {
      if (updatedTrack.played > 5) {
        await this.connector.getMongo().collection("topPlayedTracks").findOneAndUpdate({
          _id: updatedTrack.id,
        }, {
          $set: updatedTrack
        }, { upsert: true })
      }
    }
    // this.logService.addLog("Guest", "play", trackId);
    return res.rows[0] as Track;
  }

  async getTopPlayedTracks() {
    return this.connector.getMongo().collection("topPlayedTracks").find({}).toArray();
  }

  constructor(private connector: DatabaseConnector, private logService: LogService) {}
}
