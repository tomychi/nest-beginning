import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { ProjectsService } from '../services/projects.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Roles('CREATOR')
  @Post('create/userOwner/:userId')
  public async createProject(
    @Body() body: ProjectDTO,
    @Param('userId') userId: string,
  ) {
    return await this.projectService.createProject(body, userId);
  }

  @Get('all')
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @Get(':projectId')
  public async findProjectById(
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.projectService.findProjectById(id);
  }

  @AccessLevel('OWNER')
  @Put('edit/:projectId')
  public async updateProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectService.updateProject(body, id);
  }

  @AccessLevel('OWNER')
  @Delete('delete/:projectId')
  public async deleteProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.projectService.deleteProject(id);
  }
}
