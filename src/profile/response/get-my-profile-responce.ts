import { ApiProperty } from "@nestjs/swagger";

export class GetMyProfileResponse {
    @ApiProperty({example: "Герон"})
    firstName: string=''
    @ApiProperty({example:'Геронов'})
    lastName: string=''
    @ApiProperty({example:'example@test.com'})
    email: string=''
    @ApiProperty({example:'student1'})
    username: string=''
    
}