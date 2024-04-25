import { ApiProperty } from "@nestjs/swagger";
import { BicycleType } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class CreateBicycleDto {
    @ApiProperty({ 
        description: 'Bicikli típusa',
        enum: BicycleType,
        example: BicycleType.Medium // Példa az enum egy értékére
    })
    @IsEnum(BicycleType)
    type:BicycleType;
    @ApiProperty({ 
        description: 'Bicikli ára',
        example: 299.99
    })
    @IsNotEmpty({message:'Nem lehet üres az ár.'})
    @IsInt({message:'Az árnak számnak kell lennie.'})
    price:number;
}
