
const { graphqlHTTP } = require('express-graphql')
const schema = require('../gql/gqlSchema')
const ingredientRouter = require('../routes/ingredient')
const recipeRouter = require('../routes/recipe')
const imageRouter = require('../routes/image')
module.exports = (app, express) => {
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))

    app.use(express.json())
    app.use('/api/ingredient', ingredientRouter)
    app.use('/api/recipe', recipeRouter)
    app.use('/api/image', imageRouter)
    //app.use(errorHandler)
}