import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';

export interface SuccessResponseInterface {
  collectionName: string,
  data: any,
  options?: {
    location: string,
    paginationParams: PaginationParamsInterface,
    totalCount: number
  }
}
