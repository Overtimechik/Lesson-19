import { ApiProperty } from '@nestjs/swagger';

export class GetProjectFindAllResponse{
    @ApiProperty({example: '55s4a54df-asdasfd-sdafa-asdfasdffas-56dsaf654as'})
    id: string;

    @ApiProperty({example:'Название проекта'})
    name:string;
}