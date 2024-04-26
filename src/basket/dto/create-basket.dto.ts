import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class CreateBasketDto {
    @ApiProperty({ description: 'Menü azonosítója', example: 1 })
    menu:number;
    @ApiProperty({ description: 'Menü ára', example: 1000 })
    menuPrice:number;
    @ApiProperty({ description: 'Felhasználó azonosítója', example: 123 })
    userid:number;
}
