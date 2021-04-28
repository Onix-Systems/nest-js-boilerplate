import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';

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

  public normalizeParams(params: {number?: string, limit?: string, size?: string }): PaginationParamsInterface | false {
    const ret: {page: number, limit?: number} = { page: 1 };
    if (!params) {
      return ret;
    }
    if (params.number) {
      const tmp = parseInt(params.number, 10);

      if (isNaN(tmp)) return false;
      if (tmp <= 0) return false;

      ret.page = tmp;
    }

    if (params.limit) {
      const tmp = parseInt(params.limit, 10);

      if (isNaN(tmp)) return false;
      if (tmp < 0) return false;

      ret.limit = tmp;
    }

    if (params.size) {
      const tmp = parseInt(params.size, 10);

      if (isNaN(tmp)) return false;
      if (tmp < 0) return false;

      ret.limit = tmp;
    }

    return ret;
  }

  public getPaginationLinks(location: string, paginationParams: PaginationParamsInterface, pageMax: number): any {
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
}

export default new PaginationUtils();
