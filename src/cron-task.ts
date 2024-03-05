const cron = require('node-cron');
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

cron.schedule('* * * * *', async () =>{
    try{
        await prisma.token.deleteMany({
            where:{
                expiresAt: {
                    lt: new Date(),
                },
            },
        });
        console.log('Expired tokens deleted successfully.')
    }catch(error){
        console.error('Error deleting expired tokens:',error)
    }
})