import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateBasketDto {
    @ApiProperty({ description: 'Menü azonosítója', example: 1 })
    @IsNumber()
    menu:number;
    @ApiProperty({ description: 'Menü ára', example: 1000 })
    @IsNumber()
    menuPrice:number;
    @ApiProperty({ description: 'Felhasználó azonosítója', example: 123 })
    @IsNumber()
    userid:number;
}
