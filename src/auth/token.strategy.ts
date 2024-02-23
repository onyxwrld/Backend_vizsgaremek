import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-http-bearer';
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super();
    }
    async validate(token:string){
        const user = this.authService.findUserByToken(token);
        if(user == null){
            throw new UnauthorizedException();
        }
        return user;
    }
}