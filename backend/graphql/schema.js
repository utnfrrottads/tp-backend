const { gql } = require('apollo-server-express');

module.exports = gql`
  type Food {
    _id: ID!
    tag: String!
    calories: Int
    fats: Int
    proteins: Int
    carbs: Int
    category_id: String
  }
  type Post {
    _id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment{
    _id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like{
    _id: ID!
    createdAt: String!
    username: String!
  }
  type Category {
    _id: ID!
    tag: String!
  }
  type AttentionRequest {
    id: ID!
    nutritionist: Nutritionist
    state: RequestStates
    createdAt: String
  }
  enum RequestStates {
    PENDING
    ACCEPTED
    REJECTED
  }
  type User {
    id: ID!
    email: String!
    token: String!
    name: String!
    username: String!
    birthDate: String!
    createdAt: String!
    attentionRequests: AttentionRequest
  }
  type Nutritionist {
    id: ID!
    email: String
    token: String
    name: String
    username: String
    birthDate: String
    createdAt: String
    patients: [Patient]
  }
  type Patient {
    id: ID!
    email: String!
    token: String!
    name: String!
    username: String!
    birthDate: String!
    createdAt: String!
    weight: Float
    bodyMassIndex: Float
    fatPercentage: Float
    nutritionist: Nutritionist
  }
  input RegisterInput{
    name: String!
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query{
    getAllFood: [Food]
    getPosts: [Post]
    getPost(postId: ID!): Post
    getCategories: [Category]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createAttentionRequest(userId: String!, nutritionistId: String!): AttentionRequest
    solveAttentionRequest(userId: String!, nutritionistId: String!, accepted: Boolean!): AttentionRequest!
    createPatient(userId: String!, nutritionistId: String!): Patient!
    createNutritionist(userId: String!): Nutritionist
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription{
    newPost: Post!
  }
`;
