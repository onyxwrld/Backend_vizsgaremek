import { EnumState } from "@prisma/client";
import { IsEnum, IsInt, IsString, Min } from "class-validator";

export class CreateWorkerDto {
    @IsString()
    name: string;

    @IsEnum(EnumState)
    state: EnumState;

    @IsInt()
    @Min(1)
    company_id: number;
}

