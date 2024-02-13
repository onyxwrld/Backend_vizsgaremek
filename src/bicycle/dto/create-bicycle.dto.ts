import { BicycleType } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class CreateBicycleDto {
    @IsEnum(BicycleType)
    type:BicycleType;
    @IsNotEmpty()
    @IsInt()
    price:number;
}
