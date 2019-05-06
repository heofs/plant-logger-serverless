//Schema

exports.typeDefinitions = `
    type User {
        ID: String
        email: String
        country: String
    }
    type Query {
        user(ID: String!): User
        allUsers: [User!]!
    }
    type Mutation {
        createUser(email: String): Boolean
        updateUser(ID: String, country: String): User
    }
`;
