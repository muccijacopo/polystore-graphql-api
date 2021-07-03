import { Injectable } from "@nestjs/common";
import { Track } from "./track.model";
import { AddTrackInput } from "./track.resolver";

@Injectable()
export class TrackService {
  tracks: Track[] = [];

  searchByName(query: string) {
    return this.tracks.filter((track) =>
      track.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  saveNewTrack(data: AddTrackInput): Track {
    const lastTrackId = this.tracks[this.tracks.length - 1]?.id ?? 0;
    const newTrack = {
      id: lastTrackId + 1,
      name: data.name,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }
}
