import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExamDto } from './dto';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  getExams(): any {
    return this.prisma.exams.findMany();
  }

  async getExamById(id: string): Promise<any> {
    const exam = await this.prisma.exams.findUnique({ where: { id } });
    if (!exam) {
      throw new NotFoundException('Không tìm thấy đề thi');
    }
    return exam;
  }

  createExam(data: CreateExamDto): any {
    return this.prisma.exams.create({ data: { ...data, profile_id: 'a4d6a073-bec3-47a8-9314-506375aaff7c' } });
  }

  updateExam(id: string, data: CreateExamDto): any {
    return this.prisma.exams.update({ where: { id }, data });
  }

  deleteExam(id: string): any {
    return this.prisma.exams.delete({ where: { id } });
  }
}
