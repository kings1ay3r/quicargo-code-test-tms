export * from "@dtos/trucks";

export type ListResponse<T> = {
  data: T[];
  count: number;
  hasMore: boolean;
};

export type RequestContext = Record<string, any>;
