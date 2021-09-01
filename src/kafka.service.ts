import { Injectable } from "@nestjs/common";
import { Kafka } from "kafkajs";
import { AddTrackInput } from "./tracks/track.resolver";
import { TrackService } from "./tracks/track.service";

@Injectable()
export class KafkaService {
  async onModuleInit() {
    const kafka = new Kafka({
      clientId: "app",
      brokers: ["localhost:9092"],
      ssl: false,
    });

    const consumer = kafka.consumer({ groupId: "test-group" });
    await consumer.connect();
    await consumer.subscribe({ topic: "tracks", fromBeginning: true  });

    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const trackData = JSON.parse(message.value.toString()) as AddTrackInput;
        console.log({ trackData})
        // this.trackService.saveNewTrack(trackData);
      },
    });
  }

  constructor(private trackService: TrackService) {}
}
