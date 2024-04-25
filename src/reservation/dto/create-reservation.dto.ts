import { ApiProperty } from "@nestjs/swagger";
import { Optional } from "@nestjs/common";
import { ReservationState, ReservationTime } from "@prisma/client";
import { IsDateString, IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class CreateReservationDto {  
  @ApiProperty({ description: 'Felhasználó azonosítója' })
  @IsInt()
  user_id:number;
  @ApiProperty({ description: 'Kezdési időpont (ISO 8601 formátumban)' })
  @IsDateString()
  start_time: string;
  @ApiProperty({ description: 'Helyszín' })
  @IsNotEmpty()
  location: string;
  @ApiProperty({ 
    description: 'Foglalás időtartama',
    enum: ReservationTime, example: ReservationTime.Five
  })
  @IsEnum(ReservationTime)
  reservation_time: ReservationTime;
  @ApiProperty({ 
    description: 'Foglalás állapota',
    enum: ReservationState,
    required: false
  })
  @Optional()
  state: ReservationState;
  @ApiProperty({ description: 'Teljes összeg' })
  total_amount: number;
  @ApiProperty({ description: 'Bicikli azonosítója' })
  @IsInt()
  bicycle_id: number;
  @ApiProperty({ description: 'Kosár azonosítója' })
  basket_id: number;

}
