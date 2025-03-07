import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto, ExamDto, ExamWithSectionsDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonQueryDto, ErrorDto } from 'src/dto';
import { RequiredRoles } from 'src/auth/decorator';
import { ERole } from 'src/auth/dto';

@ApiBearerAuth()
@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @ApiOperation({ summary: 'Lấy tất cả đề thi' })
  @ApiResponse({ status: 200, type: ExamDto, isArray: true })
  @RequiredRoles(ERole.lecturer)
  @Get()
  getExams(@Query() query: CommonQueryDto<ExamDto>) {
    return this.examsService.getExams(query);
  }

  @ApiOperation({ summary: 'Lấy đề thi chi tiết' })
  @ApiResponse({ status: 200, type: ExamWithSectionsDto })
  @ApiResponse({ status: 404, type: ErrorDto })
  @RequiredRoles(ERole.lecturer)
  @Get(':id')
  getExamById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.examsService.getExamById(id);
  }

  @ApiOperation({ summary: 'Tạo đề thi mới' })
  @ApiResponse({ status: 201, type: ExamDto })
  @ApiResponse({ status: 404, type: ErrorDto })
  @RequiredRoles(ERole.lecturer)
  @Post()
  createExam(@Body() data: CreateExamDto) {
    return this.examsService.createExam(data);
  }

  @ApiOperation({ summary: 'Chỉnh sửa đề thi' })
  @ApiResponse({ status: 200, type: ExamDto })
  @ApiResponse({ status: 404, type: ErrorDto })
  @RequiredRoles(ERole.lecturer)
  @Put(':id')
  updateExam(@Param('id', new ParseUUIDPipe()) id: string, @Body() data: CreateExamDto) {
    return this.examsService.updateExam(id, data);
  }

  @ApiOperation({ summary: 'Xoá đề thi' })
  @ApiResponse({ status: 200, type: ExamDto })
  @ApiResponse({ status: 404, type: ErrorDto })
  @RequiredRoles(ERole.lecturer)
  @Delete(':id')
  deleteExam(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.examsService.deleteExam(id);
  }
}
