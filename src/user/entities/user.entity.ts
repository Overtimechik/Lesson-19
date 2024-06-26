import { AbstractEntity } from 'src/abstraction/abstract.entity';
import { Column,Entity,JoinColumn,OneToOne,PrimaryGeneratedColumn,ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Project } from 'src/projects/entities/project.entity';
import { Task } from 'src/projects/entities/task.entity';
import { Role } from 'src/projects/entities/role.entity';
@Entity()
export class User extends AbstractEntity<User> {


    @Column({name:"first_name"}) 
    firstName: string;

    @Column({name:"last_name"}) 
    lastName: string;

    @Column()
    email: string;

    @Column({unique:true})
    username: string

    @Column()
    password: string;



    @OneToMany(() => Task , (tasks) => tasks.user)
    @JoinTable()
    tasks: Task[];

    @OneToMany(() => Role , (role) => role.user)
    @JoinTable()
    roles:Role[];
}
