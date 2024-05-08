import { ApiProperty } from "@nestjs/swagger";
import { RolesProject } from "../entities/role.entity";
import { User } from "src/user/entities/user.entity";

export class GetParticipantsResponse {
        @ApiProperty({example: "Виктор"})
        firstName: string = ''

        @ApiProperty({example: "Геронов"})
        lastName: string = ''
        @ApiProperty({example:'student1'})
        username: string = ''
}