import { AbstractEntity } from './../../abstraction/abstract.entity';
import { User } from 'src/user/entities/user.entity';
import {Column, ManyToMany, Entity, JoinTable, OneToMany } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Project extends AbstractEntity<Project>{
    @Column()
    name: string;

    @ManyToMany(()=>User, (users) => users.projects)
    users: User[];

    @OneToMany(()=> Task, (tasks) => tasks.project)
    @JoinTable()
    tasks: Task[];
}
