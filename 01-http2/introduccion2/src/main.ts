import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Importar cosas en TS
const cookieParser = require('cookie-parser'); // Importar cosas en JS
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  // npm run start:dev
  /*
  * AQUI CONFIGURACION
  * ANTES DEL APP.LISTEN()
  *  */
  // await app.listen(3001);
  app.use(cookieParser('Me agradan los poliperros'));
  app.set('view engine', 'ejs');

  await app.listen(3001);
}
bootstrap();