import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class ReservationService {
  constructor(private readonly db: PrismaService) { }
  async create(createReservationDto: CreateReservationDto, user_id: number) {
    const deletedbasket = await this.db.basket.findFirst({
      where: { deleted: false }
    });
    if(deletedbasket){
    const reservation = await this.db.reservation.create({
      
      include: {
        user: {
          include:
          {
            basket:{
              where:{
                deleted:false
              },
            
            include:
              {
                menu:
                {
                  select:
                  {
                    price: true
                  }
                }
              }
            }
            
          }
        }, bicycle: { select: { id: true, price: true } }
      },
      data: {
        state: "Pending",
        start_time: createReservationDto.start_time,
        location: createReservationDto.location,
        reservation_time: createReservationDto.reservation_time,
        total_amount: 0,
        user: {
          connect: {
            id: user_id
          }
        }, bicycle: {
          connect: {
            id: createReservationDto.bicycle_id
          }
        }
      },
    });
    let total_sum = 0;
    for (let users of reservation.user.basket) {

      for (let menuitems of users.menu) {
        total_sum += menuitems.price
      }

    };
    total_sum+=reservation.bicycle.price
    reservation.total_amount = total_sum;
  
    return reservation;
  }
  }

  async findAll(user_id: number) {
    try {
      const reservations = await this.db.reservation.findMany({
        include: {

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
          },
          bicycle: { select: { price: true, type: true } }
        },
        where: { user_id },
      });

      for (let reservation of reservations) {
        let total_sum = 0;


        for (let basketItem of reservation.user.basket) {
          for (let menuItem of basketItem.menu) {
            total_sum += menuItem.price;
          }
        }

        //itt nem biztos hogy a ciklus a jó megoldás
        total_sum += reservation.bicycle.price

        reservation.total_amount = total_sum;
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
  updateState(id:number,updateReservationDto:UpdateReservationDto){
    return this.db.reservation.update({
      data: {state: updateReservationDto.state},
      where: {id}
    })
  }
   async findAllres() {
    try {
      const reservations = await this.db.reservation.findMany({
        include: {

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
          },
          bicycle: { select: { price: true, type: true } }
        },
        
      });

      for (let reservation of reservations) {
        let total_sum = 0;


        for (let basketItem of reservation.user.basket) {
          for (let menuItem of basketItem.menu) {
            total_sum += menuItem.price;
          }
        }

        //itt nem biztos hogy a ciklus a jó megoldás
        total_sum += reservation.bicycle.price

        reservation.total_amount = total_sum;
      }

      return reservations;
    } catch (error) {
      console.error("Error fetching reservations:", error);
      throw error;
    }
  }
   }
     

