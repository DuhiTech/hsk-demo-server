import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectionDto, SectionDto, UpdateSectionDto } from './dto';
import { MessageDto } from 'src/dto';

@Injectable()
export class SectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSectionById(id: string): Promise<SectionDto> {
    const section = await this.prisma.sections.findUnique({ where: { id } });

    if (!section) {
      throw new NotFoundException('Không tìm thấy phần thi.');
    }

    return section;
  }

  async createSection(data: CreateSectionDto): Promise<SectionDto> {
    const lastSection = await this.prisma.sections.findFirst({
      where: { exam_id: data.exam_id },
      orderBy: { order: 'desc' },
    });

    // Lấy thứ tự cuối cùng cho section
    const newOrder = lastSection ? lastSection.order + 1 : 1;

    return this.prisma.sections.create({
      data: {
        ...data,
        order: newOrder,
      },
    });
  }

  async updateSection(id: string, data: UpdateSectionDto, profile_id: string): Promise<SectionDto> {
    const section = await this.prisma.sections.update({
      where: { id, exam: { profile_id } },
      data: { ...data, modified_at: new Date() },
    });

    if (!section) {
      throw new ForbiddenException('Bạn không có quyền cập nhật phần thi này.');
    }

    return section;
  }

  async deleteSection(id: string, profile_id: string): Promise<SectionDto> {
    const section = await this.prisma.sections.findUnique({ where: { id, exam: { profile_id } } });
    if (!section) throw new ForbiddenException('Bạn không có quyền cập nhật phần thi này.');

    await this.prisma.sections.delete({ where: { id } });

    const currTime = new Date();

    // Cập nhật lại thứ tự cho các Section còn lại
    await this.prisma.sections.updateMany({
      where: { exam_id: section.exam_id, order: { gt: section.order } },
      data: { order: { decrement: 1 }, modified_at: currTime },
    });

    return section;
  }

  async updateSectionsOrder(exam_id: string, sectionIds: string[]): Promise<MessageDto> {
    const sections = await this.prisma.sections.findMany({
      where: { exam_id },
      orderBy: { order: 'asc' },
    });

    // Kiểm tra xem tất cả ID có hợp lệ không
    const invalidIds = sections.filter((s) => !sectionIds.includes(s.id));

    if (invalidIds.length > 0) {
      throw new BadRequestException('ID phần thi không hợp lệ');
    }

    const updates: any[] = [];
    const currTime = new Date();

    sectionIds.forEach((id, index) => {
      const section = sections.find((s) => s.id === id);

      if (!section) {
        throw new BadRequestException('Lỗi phần thi không tồn tại');
      }

      if (section.order !== index + 1) {
        updates.push(
          this.prisma.sections.update({
            where: { id },
            data: { order: index + 1, modified_at: currTime },
          }),
        );
      }
    });

    await this.prisma.$transaction(updates);

    return { message: 'Thứ tự phần thi được thay đổi thành công!' };
  }
}
