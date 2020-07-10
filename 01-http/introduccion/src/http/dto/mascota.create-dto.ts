import {
    IsAlpha,
    IsBoolean,
    IsInt,
    IsNotEmpty, IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

export class MascotaCreateDto{

    @IsNotEmpty()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    nombre: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    edad: number; // enteros

    @IsOptional()
    @IsBoolean()
    ligada?: boolean;

    @IsNotEmpty()
    @IsBoolean()
    casada: boolean;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    peso: number; // decimales

}