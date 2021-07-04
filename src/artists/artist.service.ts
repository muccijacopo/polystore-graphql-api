import { Injectable } from "@nestjs/common";
import { DatabaseConnector } from "src/database-connector";
import { Artist } from "./artist.model";
import { AddArtistInput } from "./artist.resolver";

@Injectable()
export class ArtistService {
  async addArtist({ id, name, followers, popularity }: AddArtistInput) {
    const res = await this.connector
      .getPostgres()
      .query(
        "INSERT INTO artists (id, name, followers, popularity) \
        VALUES($1, $2, $3, $4) \
        RETURNING *",
        [id, name, followers, popularity],
      );
    return res.rows[0] as Artist;
  }

  async findAllArtists() {
    const res = await this.connector
      .getPostgres()
      .query("SELECT * FROM artists");
    return res.rows as Artist[];
  }

  async findArtistById(id: string) {
    const res = await this.connector
      .getPostgres()
      .query("SELECT * FROM artists WHERE id = $1", [id]);
    return res.rows[0] as Artist;
  }

  constructor(private connector: DatabaseConnector) {}
}
