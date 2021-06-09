import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';

class ResponseUtils {
  public success(collectionName: string, data: any, options?: {location: string, paginationParams: PaginationParamsInterface, totalCount: number}) {
    return {
      collectionName,
      data,
      options,
    };
  }
}

export default new ResponseUtils();
