const AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1"
  //   endpoint: "http://localhost:8000"
});

dynamo = new AWS.DynamoDB.DocumentClient();
const promisify = require("./src/functions/promisify");

const getUsers = () => {
  promisify(callback =>
    dynamo.scan(
      {
        TableName: "users-table-dev"
      },
      callback
    )
  )
    .then(result => {
      console.log(result.Items);
      return result;
    })
    .catch(error => console.error(error));
};

getUsers();
