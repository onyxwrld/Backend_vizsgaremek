import {  MenuType } from "@prisma/client";
import {IsEnum, IsNotEmpty, IsNumber, Min, isPositive } from "class-validator";

export class CreateMenuDto {
    @IsNotEmpty({message:'A név megadása kötelező'})
    name:string;
    @IsNotEmpty({message:'A típus megadása kötelező'})
    @IsEnum({message:'A típus nem megfelelő'})
    type:MenuType;
    @IsNotEmpty({message:'az ár nem lehet üres'})
    @IsNumber()
    @Min(1,{message:'Az ár legyen pozitív'})
    price:number;
}
/*
*model Menu {
  id    Int    @id @default(autoincrement())
  name  String
  type  String
  price Int
}
*/
