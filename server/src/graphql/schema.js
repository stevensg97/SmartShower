const graphql = require('graphql');

import StudentType from './student-type.js';
import UserType from './user-type.js';
import StatisticType from './statistic-type.js';
import Student from '../models/student';
import User from '../models/user';
import Statistic from '../models/statistic';

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    student: {
      type: StudentType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        console.log(args)
        return Student.findById(args.id)
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        console.log(args)
        return User.findById(args.id)
      }
    },
    statistic: {
      type: StatisticType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        console.log(args)
        return Statistic.findById(args.id)
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery
})
