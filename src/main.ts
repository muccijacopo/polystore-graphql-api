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

  const consumer = kafka.consumer({ groupId: 'test-group' })
  await consumer.connect()
  await consumer.subscribe({ topic: 'topic1', fromBeginning: true })

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({ topic, value: message.value.toString() })
    },
  })


  for (let i = 1; i <= 1000; i++) {
    producer.send({
      topic: "topic1",
      messages: [{ value: `Hello from ${i}`}]
    })
  }



  

  // // Consuming
  // const consumer = kafka.consumer({ groupId: 'test-group' })
  // await consumer.connect()
  // await consumer.subscribe({ topic: 'UploadFile', fromBeginning: true })

  // await consumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     console.log({
  //       partition,
  //       offset: message.offset,
  //       value: message.value.toString(),
  //     })
  //   }
  // });
}

bootstrap();
