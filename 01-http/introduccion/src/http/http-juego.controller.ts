import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query, Req, Res
} from '@nestjs/common';
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";

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
        //console.log('parametrosDeConsulta', parametrosDeConsulta);
        //return '>=)';
        console.log('Parametros', parametrosDeConsulta);
        const tieneNombreYApellido = parametrosDeConsulta.nombre != undefined && parametrosDeConsulta.apellido != undefined;

        // Para revisar que sí sean números
        if(tieneNombreYApellido){
            return parametrosDeConsulta.nombre + " " + parametrosDeConsulta.apellido;
        } else {
            throw new BadRequestException('>:)')
        }
    }

    @Post('parametros-cuerpo')
    async parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ) {
        // Promesas
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.casada = parametrosDeCuerpo.casada;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.ligada = parametrosDeCuerpo.ligada;
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.peso = parametrosDeCuerpo.peso;
        try {
            const errores: ValidationError[] = await validate(mascotaValida)
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                throw new BadRequestException('Error validando 1');
            } else {
                const mensajeCorrecto = {
                    mensaje: 'Se creó correctamente'
                }
                return mensajeCorrecto;
            }
        } catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Error validando 2');
        }
    }

    // 1 Guardar Cookie Insegura
    @Get('guardarCookieInsegura')
    async guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req, // request
        @Res() res // response
    ) {
        res.cookie(
            'galletaInsegura', // nombre
            'Tengo hambre', // valor
        );
        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje);
    }

    // 2 Guardar Cookie Segura
    // 3 Mostrar Cookies

}