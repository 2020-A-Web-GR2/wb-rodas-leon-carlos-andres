import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Entrenador')
export class ContactEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: "Identifier",
        name: "id_entrenador"
    })
    id: number;

    @Column({
        name: "name",
        type: "varchar",
        length: 45,
        nullable: false,
    })
    name: string;

    @Column({
        name: "type",
        type: "varchar",
        length: 45,
        nullable: false,
    })
    type: string;

    @Column({
        name: "description",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    description: string;

}