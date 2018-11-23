
const _ = require('lodash');
const PostMutations = require('./mutations/PostMutation');
const LinkMutations = require('./mutations/LinkMutation');
const UserMutations = require('./mutations/UserMutation');

const PostQueries = require('./queries/PostQuery');
const LinkQueries = require('./queries/LinkQuery');

module.exports = {
    Query: _.merge({}, PostQueries, LinkQueries),
    Mutation: _.merge({}, PostMutations, LinkMutations, UserMutations),
    AuthPayload: {
        user: (root, args, ctx, info) => {
            console.log(root);
            return ctx.db.query.user({where: {id: root.user.id}}, info);
        }
    }
};
