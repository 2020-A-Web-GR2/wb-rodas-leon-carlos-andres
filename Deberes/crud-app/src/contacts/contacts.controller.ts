import {
    BadRequestException,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Query,
    Res, Session
} from '@nestjs/common';
import { ContactEntity } from './contact.entity';
import { ContactsService } from './contacts.service';
import { Post,Put, Delete, Body, Param } from  '@nestjs/common';
import {ValidationError, validate} from "class-validator";
import { ContactsCreateDto } from './dto/contacts.create.dto';
import { ContactsUpdateDto } from './dto/contacts.update.dto';

@Controller('entrenador')
export class ContactsController {

    constructor(
        private _contactsService: ContactsService
        
    ){}

    // @Get()
    // index(): Promise<ContactEntity[]> {
    //     return this._contactsService.findAll();
    // }
    //
    // @Post('create')
    // async create(@Body() contactData: ContactEntity): Promise<any> {
    //     return this._contactsService.create(contactData);
    // }
    //
    // @Put(':id/update')
    // async update(@Param('id') id, @Body() contactData: ContactEntity): Promise<any> {
    //     contactData.id = Number(id);
    //     console.log('Update #' + contactData.id)
    //     return this._contactsService.update(contactData);
    // }
    //
    // @Delete(':id/delete')
    // async delete(@Param('id') id): Promise<any> {
    //     return this._contactsService.delete(id);
    // }

    // -----------------

    @Get()
    async mostrarTodos(){
        try {
            const respuesta = await this._contactsService.buscarTodos();
            if(respuesta){
                return  respuesta;
            } else {
                throw new InternalServerErrorException({message: "Registro no encontrado"});
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({mensaje: "Error del servidor"});
        }
    }

    @Get(":id")
    async verUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        if(id === NaN || id === null){
            throw new BadRequestException({mensaje: "Error en ruta"});
        }
        try {
            const respuesta = this._contactsService.buscarUno(id);
            if(respuesta){
                return  respuesta;
            } else {
                throw new InternalServerErrorException({message: "Registro no encontrado"});
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        // Validador
        const contactCreateDto = this.asignarValidadorCrear(parametrosCuerpo);
        // Se asigna las variables al Dto
        try {
            const errores: ValidationError[] =  await validate(contactCreateDto);
            if(errores.length > 0){
                console.log(errores);
                throw new BadRequestException({mensaje: "Error en los campos"});
            } else {
                // Craer nuevo entrenador
                const nuevoEntrenador = this.crearInstanciaNueva(contactCreateDto);
                // Enviar a base de datos
                const respuesta = await this._contactsService.crearUno(nuevoEntrenador);
                if(respuesta){
                    return  respuesta;
                } else {
                    throw new InternalServerErrorException({message: "Registro no encontrado"});
                }
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }

    @Put(":id")
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        // Validador
        const contactUpdateDto = this.asignarValidadorActualizar(parametrosCuerpo, id);
        try {
            const errores: ValidationError[] = await validate(contactUpdateDto);
            if(errores.length > 0){
                console.log(errores);
                throw new BadRequestException({mensaje: "Error en los campos"});
            } else {
                // Crear entrenador actualizar
                const actualizarEntrenador = this.crearInstanciaActualizar(contactUpdateDto);
                // Enviar a la base de datos
                const respuesta = await this._contactsService.editarUno(actualizarEntrenador);
                if(respuesta){
                    return  respuesta;
                } else {
                    throw new InternalServerErrorException({message: "Registro no encontrado"});
                }
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }

    @Delete(":id")
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        if(id === NaN || id === null){
            throw new BadRequestException({mensaje: "Error en ruta"});
        }
        try {
            const respuesta = await this._contactsService.eliminarUno(id);
            if(respuesta){
                return  respuesta;
            } else {
                throw new InternalServerErrorException({message: "Registro no encontrado"});
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }


    @Get("vista/inicio")
    async inicio(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        let resultadoEncontrado;
        try {
            resultadoEncontrado = await this._contactsService.buscarTodos(parametrosConsulta.busqueda);
        } catch (error) {
            console.log("Error: ", error);
            throw new InternalServerErrorException("Error encontrando entrenadores")
        }
        if(resultadoEncontrado){
            return res.render("entrenador/inicio",
                {
                    arregloEntrenador: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                }
            )
        } else {
            throw new NotFoundException("No se encontraron entrenadores")
        }
    }

    @Get('vista/crear')
    crearContactoVista(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session
    ) {
        if(!session.usuario){
            return res.redirect("/login");
        }
        return res.render(
            'entrenador/crear',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                ruc: parametrosConsulta.ruc,
                ubicacion: parametrosConsulta.ubicacion,
                tipo: parametrosConsulta.tipo,
                responsable: parametrosConsulta.responsable,
                dinero: parametrosConsulta.dinero
            }
        )
    }

    @Get("vista/editar/:id")
    async editarContactoVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        const id = Number(parametrosRuta.id);
        let entrenadorEncontrado;
        if(id === NaN || id === null){
            throw new BadRequestException({mensaje: "Error en ruta"});
        }
        try {
            entrenadorEncontrado = await this._contactsService.buscarUno(id);
        } catch(error){
            console.log(error);
            return res.redirect("/entrenador/vista/inicio?mensaje=Error buscando entrenador");
        }
        if(entrenadorEncontrado){
            return res.render(
                'entrenador/crear',
                {
                    error: parametrosConsulta.error,
                    entrenador: entrenadorEncontrado
                }
            )
        } else {
            return res.redirect("/entrenador/vista/inicio?mensaje=Entrenador no encontrada");
        }
    }

    @Post("crearDesdeVista")
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        let camposError;
        // Validador
        const entrenadorCreateDto = this.asignarValidadorCrear(parametrosCuerpo);
        try {
            const errores: ValidationError[] = await validate(entrenadorCreateDto);
            if(errores.length > 0){
                console.log(errores);

                const mensajeError = 'Error en campos'
                camposError = `&nombre=${entrenadorCreateDto.name}&tipo=${entrenadorCreateDto.type}&descripción=${entrenadorCreateDto.description}`;

                return res.redirect('/entrenador/vista/crear?error=' + mensajeError + camposError);
            } else {
                const nuevoEntrenador = this.crearInstanciaNueva(entrenadorCreateDto);
                let respuestaCreacionEntrenador = await this._contactsService.crearUno(nuevoEntrenador);
                if(respuestaCreacionEntrenador){
                    return res.redirect('/entrenador/vista/inicio');
                } else{
                    const mensajeError = 'Error creando entrenador'
                    return res.redirect('/entrenador/vista/crear?error=' + mensajeError + camposError);
                }
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }

    @Post("editarDesdeVista/:id")
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        const id = Number(parametrosRuta.id);
        // Validador
        const entrenadorUpdateDto = this.asignarValidadorActualizar(parametrosCuerpo, id);
        try {
            const errores: ValidationError[] = await validate(entrenadorUpdateDto);
            if(errores.length > 0){
                console.log(errores);

                const mensajeError = 'Error en campos'
                const camposError = `&nombre=${entrenadorUpdateDto.name}&tipo=${entrenadorUpdateDto.type}&descripción=${entrenadorUpdateDto.description}`;

                return res.redirect('/entrenador/vista/crear?error=' + mensajeError + camposError);
            } else {
                // Craer entrenador actualizar
                const actualizarEntrenador = this.crearInstanciaActualizar(entrenadorUpdateDto);
                await this._contactsService.editarUno(actualizarEntrenador);
                return res.redirect("/entrenador/vista/inicio?mensaje=Entrenador editado");
            }
        } catch (error) {
            console.log(error);
            return res.redirect("/entrenador/vista/inicio?mensaje=Error eliminando entrenador");
        }
    }

    @Post("vista/eliminar/:id")
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        try {
            const id = Number(parametrosRuta.id);
            await this._contactsService.eliminarUno(id);
            return res.redirect("/entrenador/vista/inicio?mensaje=Usuario eliminado");
        } catch (error) {
            console.log(error);
            return res.redirect("/entrenador/vista/inicio?mensaje=Error eliminando entrenador");
        }
    }


    asignarValidadorCrear(parametrosCuerpo): ContactsCreateDto{
        const entrenadorCreateDto = new ContactsCreateDto();
        // Datos
        entrenadorCreateDto.name = parametrosCuerpo.name
        entrenadorCreateDto.type = parametrosCuerpo.type;
        entrenadorCreateDto.description = parametrosCuerpo.description;

        return entrenadorCreateDto;
    }

    asignarValidadorActualizar(parametrosCuerpo, id): ContactsUpdateDto{
        if(id === NaN || id === null){
            throw new BadRequestException({mensaje: "Error en ruta"});
        }
        const contactUpdateDto = new ContactsUpdateDto();
        // Datos
        // contactUpdateDto.id = id;
        contactUpdateDto.name = parametrosCuerpo.name;
        contactUpdateDto.type = parametrosCuerpo.type;
        contactUpdateDto.description = parametrosCuerpo.description;

        return contactUpdateDto;
    }

    crearInstanciaNueva(contactCreateDto: ContactsCreateDto): ContactEntity{
        // Crear nueva instancia
        const newContact = new ContactEntity();
        newContact.name = contactCreateDto.name;
        newContact.type = contactCreateDto.type;
        newContact.description = contactCreateDto.description;

        return newContact;
    }

    crearInstanciaActualizar(contactUpdateDto: ContactsUpdateDto): ContactEntity{
        // Craer entrenador actualizar
        const actualizarContact = new ContactEntity();
        actualizarContact.name = contactUpdateDto.name;
        actualizarContact.type = contactUpdateDto.type;
        actualizarContact.description = contactUpdateDto.description;


        return actualizarContact;
    }

}