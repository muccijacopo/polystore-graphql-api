import { Injectable } from "@nestjs/common";
import { Track } from "./track.model";
import { AddTrackInput } from "./track.resolver";

@Injectable()
export class TracksService {
    tracks: Track[] = [];

    searchByName(query: string) {
        
    }

    saveNewTrack(data: AddTrackInput): Track {
        const lastTrackId = this.tracks[this.tracks.length - 1]?.id ?? 0;
        const newTrack = {
            id: lastTrackId + 1,
            name: data.name
        }
        this.tracks.push(newTrack);
        return newTrack;
    }
}