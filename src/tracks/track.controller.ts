import { Controller, Get, HttpException, HttpStatus, Query } from "@nestjs/common";
import { TrackService } from "./track.service";

@Controller("/")
export class TrackController {

    @Get("play")
    async playTrack(@Query('track_id') trackId: string) {
        if (!trackId) throw new HttpException("Missing trackId", HttpStatus.BAD_REQUEST)
        const updatedTrack = await this.trackService.playTrack(trackId);
        if (!updatedTrack) throw new HttpException("Track not found", HttpStatus.NOT_FOUND);
        return updatedTrack;
    }

    constructor(private trackService: TrackService) {}
}