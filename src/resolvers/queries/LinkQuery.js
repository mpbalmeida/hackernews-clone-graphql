const linksFeed = (parent, {filter, skip, first, orderBy}, ctx, info) => {
    const where = filter ?
        {
            OR: [
                { url_contains: filter },
                { description_contains: filter}
            ]
        }
        : {};
    return ctx.db.query.links({ where, skip, first, orderBy}, info);
};
const singleLink = (parent, { id }, ctx, info) => {
    return ctx.db.query.link({where: {id}}, info);
};

module.exports = {
    linksFeed,
    singleLink
}