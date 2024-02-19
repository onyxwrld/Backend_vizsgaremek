import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber } from "class-validator";

export class CreateTorzsAdatokDto {
    @IsNotEmpty({message:'A telefon megadása kötelező'})
    @IsNumber()
    @IsPhoneNumber('HU', { message: 'Helytelen telefonszám' })
    phone_number: number;

    @IsNotEmpty({message:'Az email megadása kötelező'})
    @IsEmail({}, { message: 'Helytelen email formátum' })
    email:string;

    opening_hours_id: number;

    @IsNotEmpty({message:'Hely megadása megadása kötelező'})
    location: string;

    company_id: number;
}
