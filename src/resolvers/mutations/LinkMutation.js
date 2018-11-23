const createLink = (parent, {url, description}, ctx, info) => {
    return ctx.db.mutation.createLink(
      {
        data: {
          url,
          description
        }
      },
      info
    );
  };
const updateLink = (parent, {id, url, description}, ctx, info) => {
    let link = {}
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
}