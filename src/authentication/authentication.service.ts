import { CreateUserDto } from './../user/dto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository, EntityManager } from 'typeorm';
import * as bcrypt  from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';
import { TokenData } from './types/AuthRequest';



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
  const payload:TokenData = {id:user.id}
  const token = await this.jwtService.signAsync(payload)
  return JSON.stringify(token);
}
  async signUp(createUserDto: CreateUserDto) {
    const useExist = await this.userRepository.count({
      where: {
        username: createUserDto.username,
      }
    })
    if(useExist) {
      throw new HttpException(
        'Пользователь с таким именем уже существует',
        HttpStatus.CONFLICT,
      )
    }
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(createUserDto.password,salt)

    const user = new User({...createUserDto, password:hash})
    await this.userRepository.save(user)

    return JSON.stringify('Пользователь зарегестрирован');
  }

}
