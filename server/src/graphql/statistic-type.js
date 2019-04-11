const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const StatisticType = new GraphQLObjectType({
  name: 'Statistic',
  fields: () => ({
    id: { type: GraphQLString },
    date: { type: GraphQLString },
    url: { type: GraphQLString },
    liters: { type: GraphQLString }
  })
});

export default StatisticType;
