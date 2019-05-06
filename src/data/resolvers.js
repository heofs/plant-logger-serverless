// ./models/user.js

const AWS = require("aws-sdk");
const promisify = require("../functions/promisify");
const crypto = require("crypto");
// const uuidv1 = require('uuid/v1');
// uuidv1();

dynamo = new AWS.DynamoDB.DocumentClient();

exports.resolvers = {
  Query: {
    user: (_, { ID }) => getUser(ID),
    allUsers: (_, {}) => allUsers()
  },
  Mutation: {
    createUser: (_, { email }) => createUser(email),
    updateUser: (_, { ID, country }) => updateUser(ID, country)
  }
};

// Lambda functions of user

const createUser = email =>
  promisify(callback =>
    dynamo.put(
      {
        TableName: process.env.USER_TABLE,
        Item: {
          ID: crypto
            .createHash("md5")
            .update(email)
            .digest("hex")
            .toString(),
          email: email
        },
        ConditionExpression: "attribute_not_exists(#u)",
        ExpressionAttributeNames: { "#u": "ID" },
        ReturnValues: "ALL_OLD"
      },
      callback
    )
  )
    .then(result => true)
    .catch(error => {
      console.log(error);
      return false;
    });

const getUser = ID =>
  promisify(callback =>
    dynamo.get(
      {
        TableName: process.env.USER_TABLE,
        Key: { ID }
      },
      callback
    )
  )
    .then(result => {
      if (!result.Item) {
        return ID;
      }
      return result.Item;
    })
    .catch(error => console.error(error));

const allUsers = () =>
  promisify(callback =>
    dynamo.scan(
      {
        TableName: process.env.USER_TABLE
      },
      callback
    )
  )
    .then(result => {
      return result.Items;
    })
    .catch(error => console.error(error));

const updateUser = (ID, country) =>
  promisify(callback =>
    dynamo.update(
      {
        TableName: process.env.USER_TABLE,
        Key: { ID },
        UpdateExpression: "SET #foo = :bar",
        ExpressionAttributeNames: { "#foo": "country" },
        ExpressionAttributeValues: { ":bar": country },
        ReturnValues: "ALL_NEW"
      },
      callback
    )
  )
    .then(result => result.Attributes)
    .catch(error => console.log(error));
