export interface UsersApiRequestParams {
  page?: number;
  results?: number;
  nat?: string;
}

export interface PaginatedAPiResponse<T> {
  results: T[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
    hasMore: boolean;
  };
}
