const createDraft = (parent, { title, text }, ctx, info) => {
    return ctx.db.mutation.createPost(
      {
        data: {
          title,
          text,
        },
      },
      info,
    )
  };
const deletePost = (parent, { id }, ctx, info) => {
    return ctx.db.mutation.deletePost({ where: { id } }, info)
};
const publish = (parent, { id }, ctx, info) => {
    return ctx.db.mutation.updatePost(
      {
        where: { id },
        data: { isPublished: true },
      },
      info,
    );
};

module.exports = {
    createDraft, 
    deletePost, 
    publish
}