import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExamDto, ExamDto, ExamWithSectionsDto } from './dto';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  getExams(): any {
    return this.prisma.exams.findMany();
  }

  async getExamById(id: string): Promise<ExamWithSectionsDto> {
    const exam = await this.prisma.exams.findUnique({ where: { id }, include: { sections: true } });
    if (!exam) {
      throw new NotFoundException('Không tìm thấy đề thi');
    }
    return exam;
  }

  createExam(data: CreateExamDto): any {
    return this.prisma.exams.create({ data: { ...data, profile_id: 'a4d6a073-bec3-47a8-9314-506375aaff7c' } });
  }

  async updateExam(id: string, data: CreateExamDto): Promise<ExamDto> {
    const exam = this.prisma.exams.update({ where: { id }, data });
    if (!exam) {
      throw new NotFoundException('Không tìm thấy đề thi');
    }
    return exam;
  }

  async deleteExam(id: string): Promise<ExamDto> {
    const exam = await this.prisma.exams.delete({ where: { id } });
    if (!exam) {
      throw new NotFoundException('Không tìm thấy đề thi');
    }
    return exam;
  }
}
