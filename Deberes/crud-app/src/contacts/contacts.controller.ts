import { Controller, Get } from '@nestjs/common';
import { ContactEntity } from './contact.entity';
import { ContactsService } from './contacts.service';
import { Post,Put, Delete, Body, Param } from  '@nestjs/common';

@Controller('contacts')
export class ContactsController {

    constructor(
        private _contactsService: ContactsService
        
    ){}

    @Get()
    index(): Promise<ContactEntity[]> {
        return this._contactsService.findAll();
    }

    @Post('create')
    async create(@Body() contactData: ContactEntity): Promise<any> {
        return this._contactsService.create(contactData);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() contactData: ContactEntity): Promise<any> {
        contactData.id = Number(id);
        console.log('Update #' + contactData.id)
        return this._contactsService.update(contactData);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this._contactsService.delete(id);
    }

}