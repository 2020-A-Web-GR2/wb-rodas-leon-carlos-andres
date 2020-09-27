import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    description: string;

}