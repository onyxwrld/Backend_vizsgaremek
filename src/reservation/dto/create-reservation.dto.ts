import { Optional } from "@nestjs/common";
import { ReservationState, ReservationTime } from "@prisma/client";
import { IsDateString, IsEnum, IsInt } from "class-validator";

export class CreateReservationDto {  
  @IsInt()
  user_id:number;
  @IsDateString()
  start_time: string;
  @IsDateString()
  end_time: string;
  @IsEnum(ReservationTime)
  reservation_time: ReservationTime;
  @Optional()
  state: ReservationState;
  total_amount: number;


}
