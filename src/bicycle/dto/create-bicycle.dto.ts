import { BicycleType } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class CreateBicycleDto {
    @IsEnum(BicycleType)
    type:BicycleType;
    @IsNotEmpty({message:'Nem lehet üres az ár.'})
    @IsInt({message:'Az árnak számnak kell lennie.'})
    price:number;
}
