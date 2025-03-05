import { IsString, MinLength } from 'class-validator';

export class CreateExamDto {
  @IsString()
  @MinLength(3, { message: 'Tiêu đề ít nhất 3 kí tự' })
  title: string;
  description?: string;
}
