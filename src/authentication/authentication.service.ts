import { CreateUserDto } from './../user/dto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository, EntityManager } from 'typeorm';
import * as bcrypt  from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthenticationService {
  constructor(
  @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  )
  {}

  async signIn(signInDTO: SignInDTO) {
    const user = await this.userRepository.findOne({
      where: {
        username: signInDTO.username,
      },
    })
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  const isMath = await bcrypt.compare(signInDTO.password, user.password);
  if (!isMath) {
    throw new HttpException('Некоректный пароль', HttpStatus.UNAUTHORIZED)
  }
  const payload = {sub:user.id , username: user.username}
  const token = await this.jwtService.signAsync(payload)
  return token;
}
  async signUp(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(createUserDto.password,salt)

    const user = new User({...createUserDto, password:hash})
    await this.userRepository.save(user)

    return ''
  }

}
