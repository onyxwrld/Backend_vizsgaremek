import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-http-bearer';
import { AuthService } from "./auth.service";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Token } from "@prisma/client";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy){
   
    
    constructor(private readonly authService: AuthService){
        super();
    }
    async validate(token:string){
        const user = this.authService.findUserByToken(token);
        let tokenInfo: Token;
        try{
            tokenInfo = await this.authService.findUserTokenInfo(token);
        }
        catch{throw new UnauthorizedException()}
        
        const expiresAt = tokenInfo.expiresAt 
        const nowDate = new Date()
        if(user == null){
            throw new UnauthorizedException();
        }
        if(expiresAt<nowDate){
            throw new UnauthorizedException("Kérlek jelentkez be újra, lejárt a munkamenet!");
        }
        return user;
    }
}