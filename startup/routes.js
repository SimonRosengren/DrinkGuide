
const { graphqlHTTP } = require('express-graphql')
const schema = require('../gql/gqlSchema')

module.exports = (app, express) => {
    app.use('/api/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))

    app.use(express.json())
    //app.use(errorHandler)
}