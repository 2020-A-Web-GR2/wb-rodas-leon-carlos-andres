import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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

    async findAll(): Promise<ContactEntity[]> {
        return await this.contactRepository.find();
    }

    async create(contact: ContactEntity): Promise<ContactEntity> {
        return await this.contactRepository.save(contact);
    }

    async update(contact: ContactEntity): Promise<UpdateResult> {
        return await this.contactRepository.update(contact.id, contact);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.contactRepository.delete(id);
    }
}