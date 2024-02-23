import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { faker } from '@faker-js/faker'
import { hash } from 'argon2';

async function main() {
  const user = 20;
  const menu = 20;

  try {
    for (let i = 0; i < user; i++) {
      await prisma.user.create({
        data: {
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: await hash('asd'),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName()
        }
      })
      for (let index = 0; index < menu; index++) {
        let orderId : number| undefined;
        await prisma.menu.create({
          data: {
            name: faker.music.songName(),
            type: faker.helpers.arrayElement(['Drink','Snack']),
            price: faker.number.int({min:10000, max:200000})
          }
        }
        )
      }
      /*let opening_hours_id: number | undefined;
      let company_id: number | undefined;
      await prisma.torzsAdatok.create({
        data:{
          phone_number: '63000000',
          email: 'asd@asd.com',
          opening_hours_id,
          location: '1111 Budapest csimpánz utca 23',
          company_id
        }
      })
      */
    }
    
  } finally {
    prisma.$disconnect();
  } 
}

main()
