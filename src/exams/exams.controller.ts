import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto, ExamDto, ExamWithSectionsDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto';

@Controller('exams')
@ApiBearerAuth()
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả đề thi' })
  @ApiResponse({ status: 200, type: ExamDto, isArray: true })
  getExams() {
    return this.examsService.getExams();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy đề thi chi tiết' })
  @ApiResponse({ status: 200, type: ExamWithSectionsDto })
  @ApiResponse({ status: 404, type: ErrorDto })
  getExamById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.examsService.getExamById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo đề thi mới' })
  @ApiResponse({ status: 201, type: ExamDto })
  @ApiResponse({ status: 404, type: ErrorDto })
  createExam(@Body() data: CreateExamDto) {
    return this.examsService.createExam(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Chỉnh sửa đề thi' })
  @ApiResponse({ status: 200, type: ExamDto })
  @ApiResponse({ status: 404, type: ErrorDto })
  updateExam(@Param('id', new ParseUUIDPipe()) id: string, @Body() data: CreateExamDto) {
    return this.examsService.updateExam(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá đề thi' })
  @ApiResponse({ status: 200, type: ExamDto })
  @ApiResponse({ status: 404, type: ErrorDto })
  deleteExam(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.examsService.deleteExam(id);
  }
}
