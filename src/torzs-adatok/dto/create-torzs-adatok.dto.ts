import { IsEmail, IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateTorzsAdatokDto {
  @IsNotEmpty({ message: 'A név megadása kötelező' })
  phone_number: number;

  @IsEmail({}, { message: 'Helytelen email formátum' })
  email: string;

  @IsNotEmpty({ message: 'Nyitvatartási idő megadása kötelező' })
  opening_hours: string;

  @IsNotEmpty({ message: 'Hely megadása kötelező' })
  location: string;

  @IsInt()
  @Min(1, { message: 'Hibás cégazonosító' })
  company_id: number;
}

