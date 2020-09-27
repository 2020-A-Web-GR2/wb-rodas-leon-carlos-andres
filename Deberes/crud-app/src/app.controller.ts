import {Body, Controller, Get, Post, Query, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {ContactEntity} from "./contacts/contact.entity";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly _contactEntity: ContactEntity,
  ) {}

  @Get()
  redirect(
      @Res() res
  ) {
    return res.redirect('/login');
  }

  @Get('login')
  login(
      @Res() response
  ) {
    return response.render('login/login')
  }

  @Post('login')
  loginPost(
      @Body() parametrosConsulta,
      @Res() response,
      @Session() session
  ) {
    // validamos datos
    const usuario = parametrosConsulta.usuario;
    const password = parametrosConsulta.password;
    if (usuario == 'adrian' && password == '1234') {
      session.usuario = usuario
      session.roles = ['Administrador']
      return response.redirect('protegido');
    } else {
      if (usuario == 'vicente' && password == '4321') {
        session.usuario = usuario
        session.roles = ['Supervisor']
        return response.redirect('protegido');
      } else {
        return response.redirect('/login')
      }
    }
  }

  @Get('protegido')
  protegido(
      @Res() response,
      @Session() session,
  ) {
    const estaLogeado = session.usuario;
    if (estaLogeado) {
      return response.render(
          'login/protegido',
          {
            usuario: session.usuario,
            roles: session.roles
          }
      )
    } else {
      return response.redirect('/login')
    }
  }

  @Get('logout')
  logout(
      @Session() session,
      @Res() response,
      @Req() request
  ) {
    session.username = undefined;
    session.roles = undefined;
    request.session.destroy();
    return response.redirect('login')
  }

  @Get('/vista-entrenadores')
  vistaEntrenadores(
      @Res() res
  ) {
    return res.render('./entrenador/vista-entrenadores')
  }

  @Get('/crear-entrenador')
  crearEntrenador(
      @Res() res
  ) {
    return res.render('./entrenador/crear-entrenador')
  }

}
