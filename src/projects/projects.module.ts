import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { UsersProjectsEntity } from '../users/entities/usersProjects.entity';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity, UsersProjectsEntity])],
  providers: [ProjectsService, UsersService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
