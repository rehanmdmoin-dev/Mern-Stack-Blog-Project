// Reads page/limit from query params and returns { page, limit, skip } plus a
// buildMeta() helper for consistent pagination metadata in responses.
const getPagination = (query) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const defaultLimit = Number(process.env.DEFAULT_PAGE_SIZE) || 10;
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || defaultLimit, 1), 100);
  const skip = (page - 1) * limit;

  const buildMeta = (totalCount) => ({
    totalItems: totalCount,
    totalPages: Math.ceil(totalCount / limit) || 1,
    currentPage: page,
    pageSize: limit,
    hasNextPage: page * limit < totalCount,
    hasPrevPage: page > 1,
  });

  return { page, limit, skip, buildMeta };
};

module.exports = getPagination;
