import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { TaksService } from '../services/tasks.service';
import { TasksDTO } from '../dto/tasks.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {
  constructor(private readonly tasksService: TaksService) {}

  @ApiParam({
    name: 'projectId',
  })
  @AccessLevel('DEVELOPER')
  @Post('create/:projectId')
  public async createTask(
    @Body() body: TasksDTO,
    @Param('projectId') projectId: string,
  ) {
    return this.tasksService.createTask(body, projectId);
  }
}
