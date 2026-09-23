
const getPagination = (query) => {
    const page = Math.max(parseInt(query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(query.limit, 10) || 10, 1), 100);
    const skip = (page - 1) * limit;

    const buildMeta = (total) => ({
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
    });

    return { page, limit, skip, buildMeta };
};

module.exports = getPagination;
