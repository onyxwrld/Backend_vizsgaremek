import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateMenuDto {
    @IsNotEmpty({message:'A név megadása kötelező'})
    name:string;
    @IsNotEmpty({message:'A típus megadása kötelező'})
    type:string;
    @IsNumber()
    price:string;
}
/*
*model Menu {
  id    Int    @id @default(autoincrement())
  name  String
  type  String
  price Int
}
*/