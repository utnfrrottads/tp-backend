export default `
    type Reservation {
        id: ID!
        tableNumber: Int
        customerName: String
        phone: String
        email: String
        partySize: Int!
        reservationDateTime: DateTime
        cancelationDateTime: DateTime
        tables: [Table!]!
    }

    input CreateReservation {
        tableNumber: Int!
        customerName: String!
        phone: String
        email: String
        partySize: Int!
        reservationDateTime: DateTime!
        tables: [UpdateTable!]!
    }

    input UpdateReservation {
        id: ID!
        tableNumber: Int!
        customerName: String!
        phone: String
        email: String
        partySize: Int!
        reservationDateTime: DateTime!
        cancelationDateTime: DateTime
        tables: [UpdateTable!]!
    }

    type Query {
        reservation(id: ID!): Reservation
        reservations: [Reservation!]!
    }

    type Mutation {
        createReservation(reservation: CreateReservation!): Reservation

        updateReservation(reservation: UpdateReservation!): Reservation
    
        deleteReservation(id: ID!): Int!
    }
`;