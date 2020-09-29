import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from "./contacts/contact.entity";

@Module({
  imports: [
      ContactsModule,
      ContactEntity,
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: "localhost",
          port: 3306,
          username: "root",
          password: "",
          database: 'examen2-crud',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
      }),
  ],
  controllers: [AppController],
  providers: [
      AppService,
      ContactEntity,
  ],
})
export class AppModule {}
