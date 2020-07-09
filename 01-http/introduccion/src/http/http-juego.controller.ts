import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post, Query} from '@nestjs/common';

// http://localhost:3001/juegos-http
@Controller('juegos-http')
export class HttpJuegoController {

    @Get('hola')
    @HttpCode(201)
    holaGet(){
        throw new BadRequestException('No envia nada')

        // return 'Hola GET! >:)';
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

    // http://localhost:3001/juegos-http/parametros-ruta/XX/gestion/YY
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo (
        @Param() parametrosRuta
    ){
        console.log('Parametros', parametrosRuta);

        const edad = Number(parametrosRuta.edad);
        const altura = Number(parametrosRuta.altura);

        // Para revisar que sí sean números
        if(isNaN(edad) || isNaN(altura)){
            throw new BadRequestException('No son números')
        } else {
            return edad + altura;
        }
    }

    // clase 09/07/2020
    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ) {
        console.log('parametrosDeConsulta', parametrosDeConsulta);
        return '>=)';
    }

}