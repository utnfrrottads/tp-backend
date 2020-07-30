export default `
  type Table {
    id: ID!
    size: Int
  }

  type Query {
    tables: [Table]!
    table(id: ID!): Table
  }

  type Mutation {
    createTable(size: Int!): Table
    updateTable(id: ID!, size: Int!): Table
    deleteTable(id: ID!): String
  }
`;
