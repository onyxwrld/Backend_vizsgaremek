import { IsInt, IsPositive, Min } from "class-validator";

export class CreateOrderDto {
    @IsInt()
    @Min(1)
    reservation_id: number;

    @IsInt()
    @Min(1)
    quantity: number;

    @IsPositive()
    total_amount: number;

    @IsInt()
    @Min(1)
    menu_id: number;
}
