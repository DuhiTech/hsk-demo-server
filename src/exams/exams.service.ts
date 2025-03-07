import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExamDto, ExamDto, ExamWithSectionsDto } from './dto';
import { FilterQueryDto, ListResultDto } from 'src/dto';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  async getExams({
    search,
    sortBy,
    sortOrder,
    page = 1,
    take = 10,
  }: FilterQueryDto<ExamDto>): Promise<ListResultDto<ExamDto>> {
    const [data, count] = await this.prisma.$transaction([
      this.prisma.exams.findMany({
        where: search ? { title: { contains: search, mode: 'insensitive' } } : undefined,
        orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
        skip: (page - 1) * take,
        take,
      }),
      this.prisma.exams.count({ where: search ? { title: { contains: search, mode: 'insensitive' } } : undefined }),
    ]);

    return {
      data,
      count,
      totalPages: Math.ceil(count / take),
      currentPage: page,
    };
  }

  async getExamById(id: string): Promise<ExamWithSectionsDto> {
    const exam = await this.prisma.exams.findUnique({ where: { id }, include: { sections: true } });
    if (!exam) {
      throw new NotFoundException('Không tìm thấy đề thi');
    }
    return exam;
  }

  createExam(data: CreateExamDto, profile_id: string): Promise<ExamDto> {
    return this.prisma.exams.create({ data: { ...data, profile_id } });
  }

  async updateExam(id: string, data: CreateExamDto, profile_id: string): Promise<ExamDto> {
    const exam = await this.prisma.exams.update({
      where: { id, profile_id },
      data: { ...data, modified_at: new Date() },
    });
    if (!exam) {
      throw new NotFoundException('Không tìm thấy đề thi');
    }
    return exam;
  }

  async deleteExam(id: string, profile_id?: string): Promise<ExamDto> {
    const exam = await this.prisma.exams.delete({ where: { id, profile_id } });
    if (!exam) {
      throw new NotFoundException('Không tìm thấy đề thi');
    }
    return exam;
  }
}
