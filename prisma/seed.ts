import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { faker } from '@faker-js/faker'
import { hash } from 'argon2';

async function main() {
  const user = 20;
  const menu = 20;

  try {
    await prisma.user.create({
    data: {
      username: "Béci",
      email: "szabo.beci@petrik.hu",
      password: await hash('asd'),
      first_name: "Béla",
      last_name: "Szabó",
      role: "Admin"
    }
  })
  await prisma.user.create({
    data: {
      username: "Csonti",
      email: "csontos.tibor@petrik.hu",
      password: await hash('asd'),
      first_name: "Tibor",
      last_name: "Csontos",
      role: "Admin"
    }
  })
  await prisma.user.create({
    data: {
      username: "Ricsi",
      email: "szupkai.ricsi@petrik.hu",
      password: await hash('asd'),
      first_name: "Richárd",
      last_name: "Szupkai",
      role: "Admin"
    }
  })
  await prisma.basket.create({
    data:{
      total_amount:10000,
      user:{connect:{id:1}}
      
    }
  })
    for (let i = 0; i < user; i++) {
      await prisma.user.create({
        data: {
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: await hash('asd'),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          role: "User"
        }
      })
      for (let index = 0; index < menu; index++) {
        await prisma.menu.create({
          data: {
            name: faker.music.songName(),
            type: faker.helpers.arrayElement(['Drink','Snack']),
            price: faker.number.int({min:10000, max:200000}),
          }
        }
        )
      }
      
      
    }
    await prisma.opening.create({
      data:{
        Monday: "8-16",
        Tuesday:"8-16",
        Wednesday:"8-16",
        Thursday:"8-16",
        Friday:"8-20",
        Sasturday:"10-13",
        Sunday:"Closed",

      }
    })
        await prisma.torzsAdatok.create({
      data:{
        phone_number: '63000000',
        email: 'asd@asd.com',
        location: '1111 Budapest csimpánz utca 23',
        opening:{connect:{ id: 1 }},
        worker:{connect:{id:1}}
      }
    })
    
  } finally {
    prisma.$disconnect();
  } 
}

main()
