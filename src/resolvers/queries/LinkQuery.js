const linksFeed = (parent, args, ctx, info) => {
    return ctx.db.query.links(info);
};
const singleLink = (parent, { id }, ctx, info) => {
    return ctx.db.query.link({where: {id}}, info);
};

module.exports = {
    linksFeed,
    singleLink
}