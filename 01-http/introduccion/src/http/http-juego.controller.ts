import {Controller, Delete, Get, Header, HttpCode, Post} from '@nestjs/common';

// http://localhost:3001/juegos-http
@Controller('juegos-http')
export class HttpJuegoController {

    @Get('hola')
    @HttpCode(201)
    holaGet(){
        return 'Hola GET! >:)';
    }

    @Post('hola')
    @HttpCode(202)
    holaPost(){
        return 'Hola POST! >:)';
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    @Header('EPN', 'probando las cosas')
    holaDelete(){
        return 'Hola DELETE! >:)';
    }

}