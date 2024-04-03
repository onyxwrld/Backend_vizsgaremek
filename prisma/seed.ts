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
        monday:"8:00-16:00",
        tuesday:"8:00-16:00",
        wednesday:"8:00-16:00",
        thursday:"8:00-16:00",
        friday:"8:00-16:00",
        sasturday:"8:00-16:00",
        sunday:"Closed",

      }
    })
        await prisma.torzsAdatok.create({
      data:{
        phone_number: '63000000',
        email: 'asd@asd.com',
        location: '1111 Budapest csimpánz utca 23',
        opening:{connect:{ id: 1 }},
        user:{connect:{id: 1}}
      }
    })
    
  } finally {
    prisma.$disconnect();
  } 
}

main()
