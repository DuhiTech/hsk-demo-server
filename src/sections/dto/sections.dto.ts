import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class SectionDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Phần nghe' })
  title: string;

  @ApiProperty({ example: 'Mô tả' })
  @IsOptional()
  description?: string | null;

  @ApiProperty({ example: 1 })
  order: number;

  @ApiProperty({ description: 'Thời lượng theo giây', example: 0 })
  time_limit: number;

  @ApiProperty({ example: new Date().toISOString() })
  created_at: Date;

  @ApiProperty({ example: new Date().toISOString() })
  modified_at: Date;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  exam_id: string;
}

export class UpdateSectionDto {
  @ApiProperty({ example: 'Phần nghe', description: 'Tên phần' })
  @MinLength(3)
  @IsString()
  title: string;

  @ApiProperty({ example: 'Mô tả', description: 'Mô tả' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Thời lượng theo giây', example: 0 })
  time_limit: number;
}

export class CreateSectionDto extends UpdateSectionDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  exam_id: string;
}
