export class ApiModel<T> {
    pageIndex: number;
    totalPages: number;
    totalCount: number;
    items: T[]
  }