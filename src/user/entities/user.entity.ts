import { AbstractEntity } from 'src/abstraction/abstract.entity';
import { Address } from './address.entity';
import { Column,Entity,JoinColumn,OneToOne,PrimaryGeneratedColumn,ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Project } from 'src/projects/entities/project.entity';
import { Task } from 'src/projects/entities/task.entity';
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
    username: string

    @Column()
    password: string;

    @OneToOne(() => Address , {cascade: true, nullable: true} )
    @JoinColumn()
    address:Address | null

    @ManyToMany(() => Project, (project)=>project.users, {cascade: true})
    @JoinTable()
    projects: Project[];

    @OneToMany(() => Task , (tasks) => tasks.user)
    @JoinTable()
    tasks: Task[];
}
