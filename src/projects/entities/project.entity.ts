import { AbstractEntity } from './../../abstraction/abstract.entity';
import { User } from 'src/user/entities/user.entity';
import {Column, ManyToMany, Entity, JoinTable, OneToMany } from 'typeorm';
import { Task } from './task.entity';
import { Role } from './role.entity';

@Entity()
export class Project extends AbstractEntity<Project>{
    @Column()
    name: string;

    @OneToMany(()=> Task, (tasks) => tasks.project)
    @JoinTable()
    tasks: Task[];

    @OneToMany(()=> Role,(role)=> role.project)
    @JoinTable()
    roles: Role[];
}
