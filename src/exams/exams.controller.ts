import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get()
  getExams(): any {
    return this.examsService.getExams();
  }

  @Get(':id')
  getExamById(@Param('id') id: string): any {
    return this.examsService.getExamById(id);
  }

  @Post()
  createExam(@Body() data: CreateExamDto) {
    return this.examsService.createExam(data);
  }

  @Put(':id')
  updateExam(@Param('id') id: string, @Body() data: CreateExamDto) {
    return this.examsService.updateExam(id, data);
  }

  @Delete(':id')
  deleteExam(@Param('id') id: string) {
    return this.examsService.deleteExam(id);
  }
}
