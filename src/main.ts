import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import * as Redis from 'redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, "0.0.0.0");
}
bootstrap();
