import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class ReservationService {
  constructor(private readonly db: PrismaService) { }
  async create(createReservationDto: CreateReservationDto, user_id: number) {
    const reservation = await this.db.reservation.create({
      include: {
        user: {
          include:
          {
            basket:
            {
              include:
              {
                menu:
                {
                  select:
                  {
                    price:true
                  }
                }
              }
            }
          }
        }
      }
    ,
      data: {
        state: "Pending",
        start_time: createReservationDto.start_time,
        end_time:createReservationDto.end_time,
        reservation_time:createReservationDto.reservation_time,
        total_amount: 0,
        user:{
          connect:{
            id:user_id
          }
        },
      },
    });
      let total_sum = 0;
        for(let users of reservation.user.basket){
          
          for(let menuitems of users.menu ){
            total_sum += menuitems.price
          }
          
        };
        
        reservation.total_amount = total_sum;
     
     return reservation;
  }

  async findAll(user_id: number) {
    try {
        const reservations = await this.db.reservation.findMany({
            include: {
              bicycle_id: true,
                user: {
                    include: {
                        basket: {
                            include: {
                                menu: {
                                    select: {
                                        price: true
                                    }
                                }
                            }
                        }
                    }
                }
                 // Az összes biciklit lekérjük a foglalásokhoz
            },
            where: { user_id }
        });

        for (let reservation of reservations) {
            let total_sum = 0;

            // Add up the prices of menu items
            for (let basketItem of reservation.user.basket) {
                for (let menuItem of basketItem.menu) {
                    total_sum += menuItem.price;
                }
            }

            // Add up the prices of bicycles
            for (let bicycle of reservation.bicycle_id) { // Módosítás itt: reservation.bicycles
                total_sum += bicycle.price;
            }

            reservation.total_amount = total_sum; // Assign total amount to reservation object
        }

        return reservations;
    } catch (error) {
        console.error("Error fetching reservations:", error);
        throw error;
    }
}


  findOne(id: number) {
    return this.db.reservation.findUniqueOrThrow(
      {
        where: { id }
      }
    );
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.db.reservation.update({
      data: updateReservationDto,
      where: { id }
    })
  }

  remove(id: number) {
    return this.db.reservation.delete(
      {
        where: { id }
      }
    );
  }
}
