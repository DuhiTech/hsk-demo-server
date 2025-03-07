import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum ESortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export class FilterQueryDto<T = any> {
  @ApiPropertyOptional({ default: 1, description: 'Trang hiện tại' })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10, description: 'Số lượng bản ghi trên mỗi trang' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  take?: number = 10;

  @ApiPropertyOptional({ description: 'Tìm kiếm theo tiêu đề' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ type: 'string', description: 'Sắp xếp theo trường' })
  @IsOptional()
  @IsString()
  sortBy?: keyof T | string;

  @ApiPropertyOptional({ enum: ESortOrder, description: 'Thứ tự sắp xếp (asc/desc)', default: ESortOrder.Asc })
  @IsOptional()
  @IsEnum(ESortOrder)
  sortOrder?: ESortOrder = ESortOrder.Asc;
}
