import {Controller, Get} from '@nestjs/common';

// http://localhost:3001/juegos-http
@Controller('juegos-http')
export class HttpJuegoController {

    @Get('hola')
    hola(){
        return 'Hola mundo! >:)';
    }
}