export default `  
    type Table {
        id: ID!
        size: Int!
    }

    input CreateTable {
        size: Int!
    }

    input UpdateTable {
        id: ID!
        size: Int!
    }

    type Query {
        table(id: ID!): Table
        tables: [Table!]!
    }

    type Mutation {
        createTable(table: CreateTable!): Table
        updateTable(table: UpdateTable!): Table
        deleteTable(id: ID!): Int
    }
`;
