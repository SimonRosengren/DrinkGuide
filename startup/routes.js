
const { graphqlHTTP } = require('express-graphql')
const schema = require('../gql/gqlSchema')
const ingredientRouter = require('../routes/ingredient')

module.exports = (app, express) => {
    app.use('/api/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))
    
    app.use(express.json())
    app.use('/api/ingredient', ingredientRouter)
    //app.use(errorHandler)
}