import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Deber01 Calculadora --- Hecho por Carlos Rodas';
  }
}
