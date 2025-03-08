import { ApiProperty } from '@nestjs/swagger';

export class ListResultDto<T> {
  @ApiProperty({ example: [], description: 'Danh sách kết quả' })
  data: T[];

  @ApiProperty({ example: 0, description: 'Tổng số kêt quả' })
  count: number;

  @ApiProperty({ example: 10, description: 'Tổng số trang' })
  totalPages: number;

  @ApiProperty({ example: 1, description: 'Trang hiện tai' })
  currentPage: number;
}
