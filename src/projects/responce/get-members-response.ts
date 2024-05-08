import { ApiProperty } from "@nestjs/swagger";
import { RolesProject } from "../entities/role.entity";
import { User } from "src/user/entities/user.entity";

export class GetMembersResponse {
    @ApiProperty({example: RolesProject.worker})
    role:RolesProject
    @ApiProperty({
        example: {
            username:'testnick',
            firstName:'Герон',
            lastName:'Геронов'
        }
    })
    user: Pick<User, 'username'|'firstName'|'lastName'>
}