import { Injectable } from "@nestjs/common";
import { DatabaseConnector } from "src/database-connector";
import { LogService } from "src/actionLogs/log.service";
import { Track } from "./track.model";
import { AddTrackInput } from "./track.resolver";
import { TrackModule } from "./track.module";

const getYearMonthDayFromDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return { year, month, day };
}

@Injectable()
export class TrackService {

  async findTracks(filter: string, limit: number = 10) {
    this.connector.getMongo().collection("searches").insertOne({
      user: "Jacopo",
      query: filter
    });
    filter = (filter || "").toLowerCase();
    const cacheResponse = await this.connector.getRedis().get(`tracks:${filter}:${limit}`);
    if (cacheResponse) return JSON.parse(cacheResponse);

    const tracks = await (async () => {
      const query = "SELECT * FROM tracks WHERE name ILIKE $1 ORDER BY popularity DESC LIMIT $2";
      const res = await this.connector
        .getPostgres()
        .query(query, [`%${filter}%`, limit]);
      return res.rows;
    })();

    this.connector.getRedis().setex(`tracks:${filter}:${limit}`, 30, JSON.stringify(tracks));
    return tracks;
  }

  async findTracksByArtist(artistId: string, limit: number = 10) {
    const res = await this.connector.getPostgres()
    .query("SELECT * FROM tracks WHERE artist_id = $1 ORDER BY popularity DESC LIMIT $2", [artistId, limit]);
    return res.rows as Track[];
  }

  async findTrackById(trackId: string): Promise<Track> {
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
        "INSERT INTO tracks (id, name, popularity, duration, explicit, release_date, artist_id, played) \
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) \
        RETURNING *",
        [id, name, popularity, duration, explicit, release_date, artist_id, 0],
      ).catch(() => {
        return { rows: [null] }
      });
    return res.rows[0] as Track;
  }

  async updateMostPlayedTracks(track: Track) {
    const { year, month, day } = getYearMonthDayFromDate(new Date);
    const tracksDayPlayedData = await this.connector.getMongo().collection("mostPlayedTracksByDay").findOne({
      date: `${day}-${month}-${year}`,
    });
    if (!tracksDayPlayedData) {
      this.connector.getMongo().collection("mostPlayedTracksByDay").insert({
        date: `${day}-${month}-${year}`,
        tracks: [{
          ...track,
          played: 1
        }]
      })
    }
    const currentTrackPlayedData = await this.connector.getMongo().collection("mostPlayedTracksByDay").findOne({
      date: `${day}-${month}-${year}`,
      "tracks.id": track.id,
    });
    if (!currentTrackPlayedData) {
      const updatedTrack = {
        ...track,
        played: 1
      }
      await this.connector.getMongo().collection("mostPlayedTracksByDay").findOneAndUpdate({
        date: `${day}-${month}-${year}`
      }, {
        $push: { tracks: updatedTrack } 
      });
    } else {
      this.connector.getMongo().collection("mostPlayedTracksByDay").updateOne({
        date: `${day}-${month}-${year}`,
        "tracks.id": track.id,
      }, {
        $inc: { "tracks.$.played": 1 }
      })
    }
  }

  async playTrack(trackId: string) {
    const res = await this.connector.getPostgres()
    .query("UPDATE tracks SET played = played + 1 WHERE id = $1 RETURNING *", [trackId]);
    const updatedTrack = res.rows[0] as Track;
    this.updateMostPlayedTracks(updatedTrack);
      // if (updatedTrack.played > 5) {
      //   await this.connector.getMongo().collection("topPlayedTracks").findOneAndUpdate({
      //     _id: updatedTrack.id,
      //   }, {
      //     $set: updatedTrack
      //   }, { upsert: true })
      // }
    // this.logService.addLog("Guest", "play", trackId);
    return res.rows[0] as Track;
  }

  async getMostPlayedTracksByDate(date: Date) {
    const { year, month, day } = getYearMonthDayFromDate(date);
    return ((await this.connector.getMongo().collection("mostPlayedTracksByDay").findOne({
      date: `${day}-${month}-${year}`
    }))?.tracks ?? []) as Track[];
  }

  constructor(private connector: DatabaseConnector, private logService: LogService) {}
}
