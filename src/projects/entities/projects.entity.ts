import { BaseEntity } from '../../config/base.entity';
import { IProject } from '../../interfaces/project.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => UsersProjectsEntity,
    (usersPorjects) => usersPorjects.project,
  )
  usersIncludes: UsersProjectsEntity[];
}
