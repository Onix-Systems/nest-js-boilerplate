import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import commonConstants from '../constants/common.constants';

class PaginationUtils {
  private static buildLink(location: string, paginationParams?: PaginationParamsInterface): string {
    if (!process.env.SERVER_HOST) {
      throw new Error('SERVER_HOST parameter did not provide in env');
    }

    let url = `${process.env.SERVER_HOST}/${location}?`;
    let count = 0;
    if (paginationParams) {
      if (paginationParams.page) {
        url += `page=${paginationParams.page}`;
        count += 1;
      }
      if (paginationParams.limit) {
        if (count > 0) {
          url += '&';
        }

        url += `limit=${paginationParams.limit}`;
      }
    }

    return url;
  }

  private static normalizeParam(param? :string): number | false {
    if (param) {
      const tmp = parseInt(param, 10);

      if (isNaN(tmp)) return false;
      if (tmp <= 0) return false;

      return tmp;
    }

    return false;
  }

  public normalizeParams(params: {number?: string, limit?: string, size?: string }): PaginationParamsInterface | false {
    const ret: {page: number, limit?: number} = { page: 1 };
    if (!params) {
      return ret;
    }

    const page = PaginationUtils.normalizeParam(params.number);
    if (page) {
      ret.page = page;
    }

    const limit = PaginationUtils.normalizeParam(params.limit);
    if (limit) {
      ret.limit = limit;
    }

    const size = PaginationUtils.normalizeParam(params.size);
    if (size) {
      ret.limit = size;
    }

    return ret;
  }

  public getPaginationLinks(location: string, paginationParams: PaginationParamsInterface, totalCount: number): any {
    const pageMax = Math.floor(totalCount / (paginationParams.limit ? paginationParams.limit : commonConstants.pagination.defaultLimit)) + 1;

    return {
      self: PaginationUtils.buildLink(location, paginationParams),
      first: PaginationUtils.buildLink(location, { page: 1, limit: paginationParams.limit }),
      last: PaginationUtils.buildLink(location, { page: pageMax, limit: paginationParams.limit }),
      next: PaginationUtils.buildLink(location,
        {
          page: paginationParams.page === pageMax ? pageMax : paginationParams.page + 1,
          limit: paginationParams.limit,
        }),
      prev: PaginationUtils.buildLink(location,
        {
          page: paginationParams.page === 1 ? 1 : paginationParams.page - 1,
          limit: paginationParams.limit,
        }),
    };
  }

  public getSkipCount(page?: number, limit?: number): number {
    let skip = 0;

    if (page) {
      skip = page - 1;

      if (limit) {
        skip *= limit;
      } else {
        skip *= commonConstants.pagination.defaultLimit;
      }
    }

    return skip;
  }

  public getLimitCount(limit?: number): number {
    let limitPerPage = commonConstants.pagination.defaultLimit;
    if (limit) {
      limitPerPage = limit;
    }
    return limitPerPage;
  }
}

export default new PaginationUtils();
