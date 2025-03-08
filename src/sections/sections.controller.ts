import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSectionDto, SectionDto, UpdateSectionDto } from './dto';
import { ErrorDto, MessageDto } from 'src/dto';
import { Profile, RequiredRoles } from 'src/auth/decorator';
import { ERole } from 'src/auth/dto';

@ApiBearerAuth()
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionService: SectionsService) {}

  @ApiOperation({ summary: 'Tạo phần thi' })
  @ApiResponse({ status: 201, type: SectionDto })
  @Post()
  createSection(@Body() data: CreateSectionDto) {
    return this.sectionService.createSection(data);
  }

  @ApiOperation({ summary: 'Lấy chi tiết phần thi' })
  @ApiResponse({ status: 200, type: SectionDto })
  @ApiResponse({ status: 404, type: ErrorDto })
  @RequiredRoles(ERole.lecturer)
  @Get('/:id')
  getSectionById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.sectionService.getSectionById(id);
  }

  @ApiOperation({ summary: 'Chỉnh sửa phần thi' })
  @ApiResponse({ status: 200, type: SectionDto })
  @ApiResponse({ status: 404, type: ErrorDto })
  @RequiredRoles(ERole.lecturer)
  @Put('/:id')
  updateSection(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateSectionDto,
    @Profile('id') profile_id: string,
  ) {
    return this.sectionService.updateSection(id, data, profile_id);
  }

  @ApiOperation({ summary: 'Chỉnh sửa phần thi' })
  @ApiResponse({ status: 200, type: SectionDto })
  @ApiResponse({ status: 404, type: ErrorDto })
  @RequiredRoles(ERole.lecturer)
  @Delete('/:id')
  deleteSection(@Param('id', new ParseUUIDPipe()) id: string, @Profile('id') profile_id: string) {
    return this.sectionService.deleteSection(id, profile_id);
  }

  @ApiOperation({ summary: 'Cập nhật thứ tự phần thi' })
  @ApiBody({ type: String, isArray: true })
  @ApiResponse({ status: 200, type: MessageDto })
  @ApiResponse({ status: 404, type: ErrorDto })
  @RequiredRoles(ERole.lecturer)
  @Patch('/exam/:exam_id/order')
  updateSectionsOrder(@Param('exam_id', new ParseUUIDPipe()) exam_id: string, @Body() sectionIds: string[]) {
    return this.sectionService.updateSectionsOrder(exam_id, sectionIds);
  }
}
