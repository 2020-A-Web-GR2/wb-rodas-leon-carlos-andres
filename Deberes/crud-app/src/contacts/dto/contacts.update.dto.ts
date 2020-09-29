import {IsInt, IsNotEmpty, MaxLength, Min, MinLength} from "class-validator";

export class ContactsUpdateDto {

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    id: number;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(45)
    name: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(45)
    type: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    description: string;

}