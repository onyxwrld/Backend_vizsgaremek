import { ApiProperty } from "@nestjs/swagger";
import {  MenuType } from "@prisma/client";
import {IsEnum, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateMenuDto {
  @ApiProperty({ description: 'Menü név', example: 'Hamburger' })
    @IsNotEmpty({message:'A név megadása kötelező'})
    name:string;

    @ApiProperty({ 
      description: 'Menü típusa',
      enum: MenuType,
      example: MenuType.Drink // Példa az enum egy értékére
  })
    @IsNotEmpty({message:'A típus megadása kötelező'})
    @IsEnum(MenuType)
    type:MenuType;

    @ApiProperty({ 
      description: 'Menü ára',
      example: 8000
  })
    @IsNotEmpty({message:'az ár nem lehet üres'})
    @IsNumber()
    @Min(1,{message:'Az ár legyen pozitív'})
    price:number;
}

