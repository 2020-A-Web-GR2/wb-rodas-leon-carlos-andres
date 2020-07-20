import { IsNotEmpty, IsNumber } from 'class-validator';

export class SumCalcDto{

    @IsNotEmpty()
    @IsNumber()
    numero1: number = null;

    @IsNotEmpty()
    @IsNumber()
    numero2: number = null;

}