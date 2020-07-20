import { IsNotEmpty, IsNumber, NotEquals } from 'class-validator';

export class DividirCalcDto{

    @IsNotEmpty()
    @IsNumber()
    numero1: number = null;

    @IsNotEmpty()
    @IsNumber()
    @NotEquals(0)
    numero2: number = null;

}