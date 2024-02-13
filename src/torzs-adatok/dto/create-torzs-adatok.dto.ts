import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber } from "class-validator";

export class CreateTorzsAdatokDto {
    @IsNotEmpty({message:'A telefon megadása kötelező'})
    @IsNumber()
    @IsPhoneNumber('HU', { message: 'Helytelen telefonszám' })
    phone_number: number;

    @IsNotEmpty({message:'Az email megadása kötelező'})
    @IsEmail({}, { message: 'Helytelen email formátum' })
    email:string;

    @IsNotEmpty({message:'Nyitási adatok megadása kötelező'})
    opening_hours : string;

    @IsNotEmpty({message:'Hely megadása megadása kötelező'})
    location: string;

    company_id: number;
}
