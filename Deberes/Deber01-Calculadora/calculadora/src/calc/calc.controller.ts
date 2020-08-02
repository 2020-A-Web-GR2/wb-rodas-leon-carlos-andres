import {
    BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, Res, Headers
} from '@nestjs/common';
// import { validate, ValidationError } from 'class-validator';
// import { SumCalcDto } from './dto/sum.calc-dto';
// import { DividirCalcDto } from './dto/dividir.calc-dto';

// http://localhost:3002/calc
@Controller('calc')
export class CalcController {

    // Cookie
    // http://localhost:3002/calc/guardarCookie
    @Get("guardarCookie")
    guardarCookie(
        @Query() query,
        @Res() res
    ){
        const validarNombre = query.nombre

        if (validarNombre){
            res.cookie(
                "nombre usuario", // nombre o clave
                query.nombre, // valor
            );
            res.cookie('puntaje', 100, {signed: true});
            const mensaje = {
                mensaje:"ok"
            }

            res.send(mensaje)
        }else{
            throw new BadRequestException('Ingrese el nombre de usuario')
        }
    }

    // Sumar
    // http://localhost:3002/calc/sumar/7
    @Get('sumar/:n2')
    @HttpCode(200)
    sumarGet(
        @Query() query,
        @Param() param,
        @Req() req,
        @Res() res
    ){
        const validarUsuario = req.cookies["nombre usuario"]
        if (validarUsuario){
            const validarN1yN2 = query.n1 && param.n2 && !isNaN(query.n1)  && !isNaN(param.n2)
            if(validarN1yN2){
                const valor: number = (Number(query.n1) + Number(param.n2))
                const puntaje: number = Number(req.signedCookies['puntaje']) - Math.abs(valor);
                this.validacionPuntaje(req, res, puntaje, valor);
                return valor;
            }else{
                throw new BadRequestException('Datos incorrectos')
            }
        }else {
            return "No está registrado"
        }
    }

    // Restar
    // http://localhost:3002/calc/restar
    @Put('restar')
    @HttpCode(201)
    restarPut(
        @Body() body,
        @Query() query,
        @Req() req,
        @Res() res
    ){
        const validarNombreUsuario = req.cookies["nombre usuario"]

        if (validarNombreUsuario) {
            const validarN1yN2 = body.n1 && query.n2 && !isNaN(body.n1) && !isNaN(query.n2)
            if (validarN1yN2) {
                const valor: number = body.n1 - Number(query.n2);
                const puntaje: number = Number(req.signedCookies['puntaje']) - Math.abs(valor);
                this.validacionPuntaje(req, res, puntaje, valor);
                return valor;
            } else {
                throw new BadRequestException('Datos incorrectos')
            }
        } else {
            return "No está registrado"
        }
    }

    // Multiplicación
    // http://localhost:3002/calc/multiplicar
    @Delete('multiplicar')
    @HttpCode(200)
    multiplicarDelete(
        @Headers() headers,
        @Body() body,
        @Req() req,
        @Res() res
    ){
        const validarNombreUsuario = req.cookies["nombre usuario"]

        if (validarNombreUsuario){
            const validarN1yN2 = headers["n1"] && body.n2 && !isNaN(headers["n1"])  && !isNaN(body.n2)
            if(validarN1yN2){
                const valor: number = Number(headers["n1"]) * Number(body.n2);
                const puntaje: number = Number(req.signedCookies['puntaje']) - Math.abs(valor);
                this.validacionPuntaje(req, res, puntaje, valor);
                return valor;
            }else{
                throw new BadRequestException('Datos incorrectos')
            }
        } else {
            return "No está registrado"
        }
    }

    // División
    // http://localhost:3002/calc/dividir/20
    @Post('dividir/:n1')
    @HttpCode(201)
    dividirDelete(
        @Param() param,
        @Headers() headers,
        @Req() req,
        @Res() res
    ){
        const validarNombreUsuario = req.cookies["nombre usuario"]

        if (validarNombreUsuario) {
            const validarN1yN2 = param.n1 && headers["n2"] && !isNaN(param.n1) && !isNaN(headers["n2"])
            if (validarN1yN2 && (Number(headers["n2"]) != 0)) {
                const valor: number = Number(param.n1) / Number(headers["n2"]);
                const puntaje: number = Number(req.signedCookies['puntaje']) - Math.abs(valor);
                this.validacionPuntaje(req, res, puntaje, valor);
                return valor;
            } else {
                throw new BadRequestException('Datos incorrectos')
            }
        } else {
            return "No está registrado"
        }
    }

    validacionPuntaje(req, res, puntaje, valor) {
        const mensajeInformativo: string = req.cookies["nombre usuario"] + ', terminaste tus puntos. Se reestablecerá a 100.'
        const mensaje = {
            respuesta: valor,
            puntos: puntaje
        }
        if (puntaje < 1) {
            mensaje['Informacion'] = mensajeInformativo
            res.cookie('puntaje', 100, {signed: true});
        } else {
            res.cookie('puntaje', puntaje, {signed: true});
        }
        res.send(mensaje);

    }

}