import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ExamDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Đề thi HSK 1' })
  title: string;

  @ApiProperty({ example: 'Mô tả' })
  description: string | null;

  @ApiProperty({ example: new Date().toISOString() })
  created_at: Date;

  @ApiProperty({ example: new Date().toISOString() })
  modified_at: Date;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  profile_id: string;
}

export class ExamWithSectionsDto extends ExamDto {
  @ApiProperty({ example: [] })
  sections: any[];
}

export class CreateExamDto {
  @ApiProperty({ example: 'Đề thi HSK 1' })
  @IsString()
  @MinLength(3, { message: 'Tiêu đề ít nhất 3 kí tự' })
  title: string;

  @ApiProperty({ example: 'Mô tả' })
  description?: string;
}
