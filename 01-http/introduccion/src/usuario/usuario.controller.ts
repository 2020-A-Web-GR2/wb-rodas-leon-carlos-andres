import {Controller} from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {

    public arregloUsuarios = [
        {
            id: 1,
            nombre: "User1"
        },
        {
            id: 2,
            nombre: "User2"
        },
        {
            id: 3,
            nombre: "User3"
        }
    ]
    public idActual = 3;

    @Get()
    mostrarTodos(){
        return this.arregloUsuarios;
    }

    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ) {
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.nombre
        }
        this.arregloUsuarios.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
    }

    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ) {
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuarios[indice];
    }
}