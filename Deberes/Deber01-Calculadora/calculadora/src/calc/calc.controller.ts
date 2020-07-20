import {
    BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, Res, Headers
} from '@nestjs/common';
// import { validate, ValidationError } from 'class-validator';
// import { SumCalcDto } from './dto/sum.calc-dto';
// import { DividirCalcDto } from './dto/dividir.calc-dto';

// http://localhost:3002/calc
@Controller('calc')
export class CalcController {

    // Cookie Insegura
    // http://localhost:3002/calc/guardarCookieInsegura
    @Get("guardarCookieInsegura")
    guardarCookieInsegura(
        @Query() query,
        @Res() res
    ){
        const validarNombre = query.nombre

        if (validarNombre){
            res.cookie(
                "nombre usuario", // nombre o clave
                query.nombre, // valor
            );
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
        @Req() req
    ){
        const validarUsuario = req.cookies["nombre usuario"]
        if (validarUsuario){
            const validarN1yN2 = query.n1 && param.n2 && !isNaN(query.n1)  && !isNaN(param.n2)
            if(validarN1yN2){
                return Number(query.n1) + Number(param.n2)
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
        @Req() req
    ){
        const validarNombreUsuario = req.cookies["nombre usuario"]

        if (validarNombreUsuario) {
            const validarN1yN2 = body.n1 && query.n2 && !isNaN(body.n1) && !isNaN(query.n2)
            if (validarN1yN2) {
                return body.n1 - Number(query.n2)
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
        @Req() req
    ){
        const validarNombreUsuario = req.cookies["nombre usuario"]

        if (validarNombreUsuario){
            const validarN1yN2 = headers["n1"] && body.n2 && !isNaN(headers["n1"])  && !isNaN(body.n2)
            if(validarN1yN2){
                return Number(headers["n1"]) * Number(body.n2)
            }else{
                throw new BadRequestException('Datos incorrectos')
            }
        } else {
            return "No está registrado"
        }
    }

    // Devisión
    // http://localhost:3002/calc/dividir/20
    @Post('dividir/:n1')
    @HttpCode(201)
    dividirDelete(
        @Param() param,
        @Headers() headers,
        @Req() req
    ){
        const validarNombreUsuario = req.cookies["nombre usuario"]

        if (validarNombreUsuario) {
            const validarN1yN2 = param.n1 && headers["n2"] && !isNaN(param.n1) && !isNaN(headers["n2"])
            if (validarN1yN2 && (Number(headers["n2"]) != 0)) {
                return Number(param.n1) / Number(headers["n2"])
            } else {
                throw new BadRequestException('Datos incorrectos')
            }
        } else {
            return "No está registrado"
        }
    }

}