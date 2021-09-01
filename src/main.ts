import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { Kafka } from 'kafkajs';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, "0.0.0.0");

  const kafka = new Kafka({
    clientId: 'app',
    brokers: ['localhost:9092'],
    ssl: false
  });

  const producer = kafka.producer()
  await producer.connect();

  const newTrack = {
    trackId: 1,
    trackName: "ciao"
  }

  console.log("SEND")
  await producer.send({
    topic: "tracks",
    messages: [{
      value: JSON.stringify(newTrack)
    }]
  })
}

bootstrap();
