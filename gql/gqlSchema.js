const graphql = require('graphql');
const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        instructions: { type: GraphQLString },
        ingredients: {
            type: IngredientType,
            async resolve(parent, args) {
                // Since there is no unique ID connecting data entries and since one entry might fail on certain data, the connection is 
                // any entry made 5 minutes before or 5 minutes after.
                console.log(`Parent: ${JSON.stringify(parent)}`);  
                

                // let before = new Date(parseInt(parent.date));
                // before.setMinutes(before.getMinutes() - 5);
                // let later = new Date(parseInt(parent.date));
                // later.setMinutes(before.getMinutes() + 5);
                // const temp = await Temperature.find({ date: { $gte: before.getTime(), $lt: later.getTime() } }).sort({ date: -1 }).limit(1);
                // return temp[0];
            }
        }
    })
});

const IngredientType = new GraphQLObjectType({
    name: 'Ingredient',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        color: { type: GraphQLString },
        description: { type: GraphQLString },
        alcohol: { type: GraphQLInt }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Recipe: {
            type: RecipeType,
            async resolve(parent, args) {
                const result = await Recipe.find({});
                return result;
            }            
        },

        Ingredient: {
            type: IngredientType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                const result = await Ingredient.findOne({ name: 'milk' }).exec();
                return result;
            }
        }

        // SoilMoistures: {
        //     type: GraphQLList(DrinkType),
        //     args: { limit: { type: GraphQLInt } },
        //     async resolve(parent, args) {
        //         const result = await SoilMoisture.find({}).sort({ date: -1 }).limit(args.limit);
        //         return result;
        //     }
        // }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})