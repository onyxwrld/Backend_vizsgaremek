import { IsEmail, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message:'A név megadása kötelező'})
    @Max(20,{message:"A név maximum 20 karakter lehet"})
    @Min(3,{message:"A név minimum 3 karakter kell hogy legyen"})
    username: string;
    
    @IsNotEmpty({ message: 'Az e-mail cím megadása kötelező.' })
    @IsEmail({}, { message: 'Érvénytelen e-mail cím.' })
    email: string;

    @IsNotEmpty({ message: 'A jelszó megadása kötelező.' })
    @Min(6, { message: 'A jelszó minimum 6 karakter kell hogy legyen.' })
    password: string;

    @IsString({ message: 'A keresztnévnek szöveges típusúnak kell lennie.' })
    first_name: string;
    
    @IsString({ message: 'A vezetéknévnek szöveges típusúnak kell lennie.' })
    last_name: string;
    token:string;
}
