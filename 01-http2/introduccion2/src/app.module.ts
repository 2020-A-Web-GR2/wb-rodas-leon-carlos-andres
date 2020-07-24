import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from './http/http-juego.module';
import {UsuarioModule} from './usuario/usuario.module';
import {UsuarioService} from "./usuario/usuario.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Module({
  imports: [
    // Aqui otros modulos
    HttpJuegoModule,
    UsuarioModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ejemplo',
      entities: [
          UsuarioEntity,
      ],
      synchronize: true,
    }),
  ],
  controllers: [
    // Controladores APP MODULE
    AppController,
  ],
  providers: [
    // Servicios APP MODULE
    AppService,
    UsuarioService
  ],
})
export class AppModule {}