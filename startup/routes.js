
const { graphqlHTTP } = require('express-graphql')
const schema = require('../gql/gqlSchema')
const ingredientRouter = require('../routes/ingredient')
const recipeRouter = require('../routes/recipe')
module.exports = (app, express) => {
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))

    app.use(express.json())
    app.use('/api/ingredient', ingredientRouter)
    app.use('/api/recipe', recipeRouter)
    //app.use(errorHandler)
}