import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';

import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequest } from 'src/authentication/types/AuthRequest';
import { GetMyProfileResponse } from './response/get-my-profile-responce';

@ApiTags('profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @ApiOkResponse({type: GetMyProfileResponse})
  @Get()
  async getProfile(@Request() req:AuthRequest){
    await this.profileService.getProfile(req.user)
  }
  
}
