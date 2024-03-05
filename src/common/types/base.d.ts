import { BaseEntity } from '@common';
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from 'typeorm';

declare global {
  type FindOptions<T extends BaseEntity> = {
    /** Condition */
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
    /** Sort */
    order?: FindOptionsOrder<T>;
    /** Join tables */
    relations?: string[];
    /** Enable/disable eager loading */
    loadEagerRelations?: boolean;
    /** Include deleted data */
    withDeleted?: boolean;
    /** Select fields to retrieve from DB */
    select?: FindOptionsSelect<T>;
  };

  type FindOrFailOptions<T extends BaseEntity> = FindOptions<T> & {
    /** Error message when record not found */
    errorMessage?: string;
  };

  type FindPaginatedOptions<T extends BaseEntity> = Partial<FindOptions<T>> & {
    /** Number of items per page */
    limit?: number;
    /** Current page number */
    page?: number;
    /**
     * Filter
     * @examples { "name": "ABC" }
     */
    filter?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  };

  type IPaginationResponse<T> = {
    /** Array of items */
    data: T[];
    pagination: {
      /** Number of items per page */
      limit: number;
      /** Current page number */
      page: number;
      /** Total number of items */
      total: number;
    };
  };

  type IResponse<T> = {
    /** Response status code */
    status: number;
    /** Message */
    message?: string;
    /** Data */
    data: T;
    /** Pagination data */
    pagination?: {
      /** Number of items per page */
      limit: number;
      /** Current page number */
      page: number;
      /** Total number of items */
      total: number;
    };
  };

  type GenerateTokenData = {
    accessToken: string;
  };

  type LogoutData = {
    success: boolean;
  };
}

export {};
