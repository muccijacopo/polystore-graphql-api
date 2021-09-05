import { Injectable } from "@nestjs/common";
import { Kafka } from "kafkajs";
import { AddArtistInput } from "./artists/artist.resolver";
import { ArtistService } from "./artists/artist.service";
import { AddTrackInput } from "./tracks/track.resolver";
import { TrackService } from "./tracks/track.service";

@Injectable()
export class KafkaService {
  async onModuleInit() {
    const kafka = new Kafka({
      clientId: "app",
      brokers: ["kafka:9092"],
      ssl: false,
    });

    const consumer = kafka.consumer({ groupId: "test-group" });
    await consumer.connect();
    await consumer.subscribe({ topic: "tracks", fromBeginning: false });
    await consumer.subscribe({ topic: 'artists', fromBeginning: false });

    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({ topic, message: message.value.toString() })
        if (topic == 'artists') {
          const data = JSON.parse(message.value.toString()) as AddArtistInput;
          await this.artistService.addArtist(data);
        } else if (topic == 'tracks') {
          const data = JSON.parse(message.value.toString()) as AddTrackInput;
          await this.trackService.saveNewTrack(data);
        }
      },
    });
  }

  constructor(private trackService: TrackService, private artistService: ArtistService) {}
}
