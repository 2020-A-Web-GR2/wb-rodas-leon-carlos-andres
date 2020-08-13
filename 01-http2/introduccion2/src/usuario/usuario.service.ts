import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
// 1 Controlador
// 2 Servicio
// 3 Modulo
// 4 Importar servicio contolador en el modulo
// 5 Importar modulo en el modulo principal

@Injectable()
export class UsuarioService {

    constructor( // Inyeccion de dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ){
    }

    crearUno(nuevoUsuario:UsuarioEntity){
        this.repositorio.save(nuevoUsuario) // promesa
    }

    buscarTodos(){
        return this.repositorio.find() // promesa
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id) // promesa
    }
}