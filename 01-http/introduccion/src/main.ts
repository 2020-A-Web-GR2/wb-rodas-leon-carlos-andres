import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // npm run start:dev -- para iniciar el servidor
  // le cambiamos a 3001 solo para probar
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
