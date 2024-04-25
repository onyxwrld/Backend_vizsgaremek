import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber } from "class-validator";

export class CreateTorzsAdatokDto {
    @ApiProperty({ 
        description: 'Telefonszám (Helyes formátum: +36XXXXXXXXX)', 
        example: '+36301234567' 
    })
    @IsNotEmpty({message:'A telefon megadása kötelező'})
    @IsNumber()
    @IsPhoneNumber('HU', { message: 'Helytelen telefonszám' })
    phone_number: string;
    @ApiProperty({ 
        description: 'Email cím', 
        example: 'example@example.com' 
    })
    @IsNotEmpty({message:'Az email megadása kötelező'})
    @IsEmail({}, { message: 'Helytelen email formátum' })
    email:string;
    @ApiProperty({ description: 'Nyitvatartási idők azonosítója' })
    opening_hours_id: number;
    @ApiProperty({ description: 'Helyszín' })
    @IsNotEmpty({message:'Hely megadása megadása kötelező'})
    location: string;

   
}
