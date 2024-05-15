import { IsAlpha, IsString, IsOptional } from 'class-validator';
export class GetTaskFilterDto {
  @IsOptional()
  @IsAlpha()
  username?: string;
  @IsOptional()
  @IsString()
  projectId?: string;
}
