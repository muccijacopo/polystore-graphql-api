import { Controller, Get, HttpException, HttpStatus, Query } from "@nestjs/common";
import { LogService } from "src/actionLogs/log.service";
import { TrackService } from "./track.service";

@Controller("/")
export class TrackController {

    @Get("play")
    async playTrack(@Query('track_id') trackId: string, @Query("user") user: string) {
        if (!trackId) throw new HttpException("Missing trackId", HttpStatus.BAD_REQUEST)
        const updatedTrack = await this.trackService.playTrack(trackId);
        if (!updatedTrack) throw new HttpException("Track not found", HttpStatus.NOT_FOUND);
        this.logsService.addLog(user || 'Guest', "play", trackId);
        return updatedTrack;
    }

    constructor(private trackService: TrackService, private logsService: LogService) {}
}