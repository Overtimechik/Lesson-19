import { Address } from './../entities/address.entity';
import { CreateAddressDto } from './create-address.dto';
export class CreateUserDto {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    address:CreateAddressDto
}
