import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const session = require('express-session')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FileStore = require('session-file-store')(session)

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;

  const secret = 'pokemon'
  app.set('view engine', 'ejs');
  app.use(express.static('publico'))
  app.use(
      session({
        name: 'server-session-id',
        secret: secret,
        resave: true,
        saveUninitialized: true,
        cookie: {secure: false},
        store: new FileStore(),
      }),
  );

  await app.listen(3000);
}
bootstrap();
