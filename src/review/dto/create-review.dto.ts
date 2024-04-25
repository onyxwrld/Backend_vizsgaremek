import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
    @ApiProperty({ description: 'Azonosító' })
    id:number;
    @ApiProperty({ description: 'Felhasználó azonosítója' })
    userId:number;
    @ApiProperty({ 
        description: 'Értékelés (1-től 5-ig)',
        example: 4
    })
    @IsNotEmpty()
    @IsNumber()
    rate: number;
    @ApiProperty({ description: 'Tartalom' })
    @IsNotEmpty()
    content: string;
}
