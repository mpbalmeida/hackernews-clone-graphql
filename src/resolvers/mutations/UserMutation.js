const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (parent, {name, email, password}, ctx, info) => {
    const hash = await bcrypt.hash(password, 10);
    const user = await ctx.db.mutation.createUser({
        data: {
            name,
            email,
            password: hash
        }
    }, `{id}`)
    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
    return {
        token,
        user
    }
}

module.exports = {
    signup
}