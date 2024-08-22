const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    haikus: [Haiku]!
  }

  type Haiku {
    _id: ID
    haikuText: String
    haikuAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    haikus(username: String): [Haiku]
    haiku(haikuId: ID!): Haiku
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addHaiku(haikuText: String!): Haiku
    addComment(haikuId: ID!, commentText: String!): Haiku
    removeHaiku(haikuId: ID!): Haiku
    removeComment(haikuId: ID!, commentId: ID!): Haiku
  }
`;

module.exports = typeDefs;
