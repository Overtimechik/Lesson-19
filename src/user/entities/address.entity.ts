import { AbstractEntity } from "src/abstraction/abstract.entity";
import { Column,Entity , PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Address extends AbstractEntity<Address>{

    country: string;
    @Column()
    city: string;
    @Column()
    street: string;
    @Column()
    house: string;


}