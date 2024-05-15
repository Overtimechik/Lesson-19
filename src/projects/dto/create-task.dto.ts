import { IsAlpha, IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsDateString()
  startDate: string;
  @IsDateString()
  endDate: string;
  @IsOptional()
  @IsAlpha()
  username?: string;
  @IsString()
  projectId: string;
}
