import { AbstractEntity } from 'src/abstraction/abstract.entity';
import { Address } from './address.entity';
import { Column,Entity,JoinColumn,OneToOne,PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User extends AbstractEntity<User> {


    @Column({name:"first_name"}) 
    firstName: string;

    @Column({name:"last_name"}) 
    lastName: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Address , {cascade: true})
    @JoinColumn()
    address:Address

}
