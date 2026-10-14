/**
 * Move this in types/request folder if you want to
 * use this code snippet.
 */
type PaginationConfig = {
  recordsPerPage: number;
  page: number;
};

export const defaultPagination: PaginationConfig = {
  recordsPerPage: 10,
  page: 1
};

export function getPaginationParams(
  page?: string,
  recordsPerPage?: string
): PaginationConfig {
  return {
    recordsPerPage: recordsPerPage
      ? Number(recordsPerPage)
      : defaultPagination.recordsPerPage,
    page: page ? Number(page) : defaultPagination.page
  };
}
