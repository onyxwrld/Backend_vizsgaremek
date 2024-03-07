import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    async findUserByToken(token: string) {
        const tokenObj = await this.db.token.findUnique({where: {token}})
        if(tokenObj == null){
            return null;
        }
        return await this.db.user.findFirstOrThrow({
            where: {id: tokenObj.userId}
        })
    
    }
    async findUserTokenInfo(token: string){
        const tokenObj = await this.db.token.findUnique({where: {token} })
        if(tokenObj == null){
            return null;
        }
        return await this.db.token.findFirstOrThrow({
            where:{token: tokenObj.token},
        })
    }
    async ChangePassDeleteToken(id:number){
        await this.db.token.deleteMany({
            where:{
                userId: id
            }
        });
    }
    constructor(private readonly db: PrismaService){}
  async generateTokenFor(user: User) {
    const randomBuffer = randomBytes(32);
    const randomString = randomBuffer.toString('hex');
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours()+1)



    await this.db.token.create({
        data: {
            token: randomString,
            userId: user.id,
            expiresAt: expirationTime
            
        }
    })
    return randomString;
  }
}
