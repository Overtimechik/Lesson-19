import { IsAlpha, IsNotEmpty } from 'class-validator';
import { RolesProject } from '../entities/role.entity';

export class UpdateRoleDto {
  @IsAlpha()
  username: string;
  @IsNotEmpty()
  role: RolesProject;
}
