import { NestFactory } from '@nestjs/core';
import {Options} from 'http-server';
//console.log(Options);
import { AppModule } from './app.module';
import {a,UsuarioInterface} from "./mi-codigo";

async function bootstrap() {
  console.log(a);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
