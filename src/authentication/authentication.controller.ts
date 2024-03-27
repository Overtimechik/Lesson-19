import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDTO } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authenticationService.signIn(signInDTO);
  }
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authenticationService.signUp(createUserDto);
  }

}
