const { getUserId } = require('../../utils');

const createLink = (parent, {url, description}, ctx, info) => {
    const userId = getUserId(ctx);
    return ctx.db.mutation.createLink(
        {
            data: {
                url,
                description,
                postedBy: {
                    connect: {
                        id: userId
                    }
                }
            }
        },
        info
    );
};
const updateLink = (parent, {id, url, description}, ctx, info) => {
    let link = {};
    if (url) {
        link.url = url
    }
    if (description) {
        link.description = description
    }
    return ctx.db.mutation.updateLink(
        {
            where: { id },
            data: link
        },
        info
    );
};
const deleteLink = (parent, {id}, ctx, info) => {
    return ctx.db.mutation.deleteLink({where: {id}}, info);
};

module.exports = {
    createLink,
    updateLink,
    deleteLink
};