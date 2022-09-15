
const { graphqlHTTP } = require('express-graphql')
const schema = require('../gql/gqlSchema')
const ingredientRouter = require('../routes/ingredient')
const recipeRouter = require('../routes/recipe')
const voteHandler = require('../routes/vote')
const userHandler = require('../routes/user')
const errorHandler = require('../middleware/errorHandler')
const tagHandler = require('../routes/tag')
module.exports = (app, express) => {
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))
    app.use(errorHandler)
    app.use(express.json())
    app.use('/api/ingredient', ingredientRouter)
    app.use('/api/recipe', recipeRouter)
    app.use('/api/vote', voteHandler)
    app.use('/api/user', userHandler)
    app.use('/api/tags', tagHandler)
}