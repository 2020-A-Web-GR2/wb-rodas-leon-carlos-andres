import { Injectable } from '@nestjs/common';
import {FindManyOptions, Like, Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from './contact.entity';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(ContactEntity)
        private contactRepository: Repository<ContactEntity>,
    ) {
    }

    // async findAll(): Promise<ContactEntity[]> {
    //     return await this.contactRepository.find();
    // }
    //
    // async create(contact: ContactEntity): Promise<ContactEntity> {
    //     return await this.contactRepository.save(contact);
    // }
    //
    // async update(contact: ContactEntity): Promise<UpdateResult> {
    //     return await this.contactRepository.update(contact.id, contact);
    // }
    //
    // async delete(id): Promise<DeleteResult> {
    //     return await this.contactRepository.delete(id);
    // }

    crearUno(tienda: ContactEntity){
        return this.contactRepository.save(tienda);
    }

    buscarTodos(textoConsulta?: string){
        let consulta: FindManyOptions<ContactEntity> = {};
        if(textoConsulta){
            consulta= {
                where: [
                    {
                        name: Like(`%${textoConsulta}%`)
                    },
                    {
                        type: Like(`%${textoConsulta}%`)
                    },
                    {
                        description: Like(`%${textoConsulta}%`)
                    }
                ]
            }
        }
        return this.contactRepository.find(consulta);
    }

    buscarUno(id: number){
        return this.contactRepository.findOne(id);
    }

    editarUno(tienda: ContactEntity){
        return this.contactRepository.save(tienda);
    }

    eliminarUno(id: number){
        return this.contactRepository.delete(id);
    }

}