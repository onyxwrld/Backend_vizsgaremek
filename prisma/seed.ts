import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { hash } from 'argon2';

async function main() {
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
  } finally {
    prisma.$disconnect();
  } 
}

main()
