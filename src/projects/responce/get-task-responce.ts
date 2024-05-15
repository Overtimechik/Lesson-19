import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { TaskStatus } from '../entities/task.entity';

export class GetTaskResponse {
  @ApiProperty({ example: 'Сделать дизайн' })
  title: string;

  @ApiProperty({ example: '2024-05-20T00:00:00+06:00' })
  startDate: string;

  @ApiProperty({ example: '2024-05-20T00:00:00+06:00' })
  endDate: string;

  @ApiProperty({
    example: {
      username: 'testnick',
      firstName: 'Герон',
      lastName: 'Геронов',
    },
  })
  user: Pick<User, 'username' | 'firstName' | 'lastName'>;
  @ApiProperty({
    example: {
      id: '5sd5fd5saasdasfd-5dsfa5-sadfsdasdf-5dsa5asfd',
      name: 'Название проекта',
    },
  })
  project: Project;
  @ApiProperty({ enum: TaskStatus })
  status: TaskStatus;
}
