import { IsAlphanumeric, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsAlphanumeric()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @IsNotEmpty()
    email: string;
    @IsEmail()
    username: string;
    @IsNotEmpty()
    password: string;
}
