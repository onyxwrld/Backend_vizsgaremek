import { IsNotEmpty } from "class-validator";

export class CreateTorzsAdatokDto {
    @IsNotEmpty({message:'A név megadása kötelező'})
    phone_number: number;
    email:string;
    opening_hours : string;
    location: string;
    company_id: number;

}
/*
*  phone_number  Int    @id @default(autoincrement())
  email         String @unique
  opening_hours String
  location      String
  company_id    Int    @unique
*/
