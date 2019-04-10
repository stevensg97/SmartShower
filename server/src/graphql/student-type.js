const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    hobbie: { type: GraphQLString }
  })
});

export default StudentType;
