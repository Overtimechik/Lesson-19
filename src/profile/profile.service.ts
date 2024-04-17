import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { TokenData } from 'src/authentication/types/AuthRequest';
import { Profile } from './models/profile.model';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
    async getProfile(tokenData:TokenData ){
        const user = await this.userRepository.findOne({
            where:{
                id: tokenData.id,
            }
        })
        return new Profile(user)
    }
}
