import {Entity} from 'typeorm';
import {Column, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm/index";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {VacunaEntity} from "../vacuna/vacuna.entity";

@Entity()
export class MascotaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    // Relaciones

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.mascotas
    )
    usuario: UsuarioEntity

    @OneToMany(
        type => VacunaEntity,
        vacuna => vacuna.mascota
    )
    vacunas: VacunaEntity[]

}