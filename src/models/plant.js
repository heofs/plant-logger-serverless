const AWS = require("aws-sdk");
const promisify = require("../functions/promisify");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// replace previous implementation of getGreeting
const getGreeting = firstName =>
  promisify(callback =>
    dynamoDb.get(
      {
        TableName: process.env.DYNAMODB_TABLE,
        Key: { firstName }
      },
      callback
    )
  )
    .then(result => {
      if (!result.Item) {
        return firstName;
      }
      return result.Item.nickname;
    })
    .then(name => `Hello, ${name}.`);

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    /* unchanged */
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutationType", // an arbitrary name
    fields: {
      changeNickname: {
        args: {
          // we need the user's first name as well as a preferred nickname
          firstName: {
            name: "firstName",
            type: new GraphQLNonNull(GraphQLString)
          },
          nickname: {
            name: "nickname",
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        type: GraphQLString,
        // update the nickname
        resolve: (parent, args) => changeNickname(args.firstName, args.nickname)
      }
    }
  })
});
