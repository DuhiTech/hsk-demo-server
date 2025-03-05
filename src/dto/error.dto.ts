import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 'Không tìm thấy' })
  message: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}
