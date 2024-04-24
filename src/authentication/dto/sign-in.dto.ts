import { IsAlpha, IsAlphanumeric, IsNotEmpty } from "class-validator";

export class SignInDTO {
    @IsAlphanumeric()
    username: string;
    @IsNotEmpty()
    password: string;
}
