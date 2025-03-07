export class ListResultDto<T> {
  data: T[];
  count: number;
  totalPages: number;
  currentPage: number;
}
