import { IsInt, IsPositive, Min } from "class-validator";

export class CreateOrderDto {
    @IsInt()
    @Min(1,{message: 'Az id-nek pozitivnak kell lennie'})
    reservation_id: number;

    @IsInt({message: 'A mennyiség szám kell legyen'})
    @IsPositive({message:'A mennyiség nem negatív lehet'})
    @Min(1,{message:'A mennyiségnek pozitívnak kell lennie'})
    quantity: number;

    @IsPositive({message: 'A termék ára nem  lehet negatív.'})
    total_amount: number;

    @IsInt()
    @Min(1,{message:'az id nem lehet 0'})
    menu_id: number;
}
