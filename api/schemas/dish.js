export default `
  type Dish {
    id: ID!
    title: String!
  }

  type Query {
    dishes: [Dish!]!
    dish(id: ID!): Dish
  }

  type Mutation {
    createDish(desc: String): Dish!
    updateDish(id: ID!, title: String): [Int!]!
    deleteDish(id: ID!): Int!
  }
`;
