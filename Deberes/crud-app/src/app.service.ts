import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Examen 2 - Carlos Rodas';
  }
}
