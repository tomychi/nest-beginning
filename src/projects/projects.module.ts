import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { UsersProjectsEntity } from '../users/entities/usersProjects.entity';
import { UsersService } from '../users/services/users.service';
import { ProvidersModule } from '../providers/providers.module';
import { HttpCustomService } from '../providers/http/http.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectsEntity, UsersProjectsEntity]),
    ProvidersModule,
  ],
  providers: [ProjectsService, UsersService, HttpCustomService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
