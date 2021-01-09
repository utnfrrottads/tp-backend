# Contacts API made with Typescript and Express.
Layered architecture consisting of entities, repositories, services and controllers (routes).

Some libraries used:
- Express
- TypeORM for data layer
- Jest for testing
- Zod for schema validation

## How to run:
Recommended Node.js 14
```
yarn
yarn build
yarn start
```
Tu run tests:
```
yarn test
```

## Basic File structure:
```
├── src
|   ├── controllers
|   ├── entitites
|   |   ├── dto
|   ├── errors
|   ├── helpers
|   ├── middleware
|   ├── repositories
|   ├── services
|   ├── AppInitializer.ts
|   ├── main.ts
├── test
```

## Implementation notes:

- I chose Typescript and a layered architecture because I find it easier to debug afterwards. I consider using OOP worth the extra work.
- I chose an ORM over direct DB manipulation because it's easier to switch between different DBs afterwards.
- A simple User entity was added, just for domain completeness. One User has many Contacts. Only User creation is implemented.
- The layered architecture could have been implemented with Inversion of Control. The simplest implementation was made for something done in two days, but could be easily refactored into IOC.
- There's a rate limiter implemented for all endpoints.
- App is ready to be built into a docker image.

## API Endpoints:

### GET /v1/contacts/:userId/:contactId
Returns the specified contact  
Example:  
`GET /v1/contacts/1/624`

### POST /v1/contacts/:userId
Create new contact for a user  
Example:  
`POST /v1/contacts/1`  
Body:  
```
{
    "firstName": "John",
    "lastName":"Doe",
    "company": "Microsoft",
    "profileImage": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
    "email": "john@doe.com",
    "birthdate": "11/24/1990",
    "workPhone": "444333222",
    "personalPhone": "333222444",
    "address": "Unnamed Street 342",
    "state": "CA",
    "city": "San Francisco"
}
```
### PUT /v1/contacts/:userId/:contactId
Modifies the specified contact for a user  
Example:  
`PUT /v1/contacts/1/624`  
Body:  
```
{
    "firstName": "Grantley",
    "lastName": "Abeline",
    "company": "Jaxbean",
    "profileImage": "http://dummyimage.com/250x244.png/cc0000/ffffff",
    "email": "gabell0@sbwire.com",
    "birthdate": "1974-04-23T02:00:00.000Z",
    "workPhone": "+1 (862) 990-4036",
    "personalPhone": null,
    "address": "3 Mesta Avenue",
    "state": "NJ",
    "city": "Newark"
}
```

### DELETE /v1/contacts/:userId/:contactId
Deletes the specified contact for a user  
Example:  
`DELETE /v1/contacts/1/1231`  

### GET /v1/contacts/:userId
Search endpoint for a particular user.  
Schema is:  
```
{
    firstName: string
    lastName: string
    company: string
    profileImage: string;
    email: string
    birthdate: string
    workPhone: string
    personalPhone: string
    address: string
    state: string
    city: string
}
```

There's also the "same" option for searching for contacts with the same field values as another contact:
```
{
    same:
    {
        id: number // The id of the contact to be used as reference
        keys: string[] // The field keys to be compared, like "state" or "city"
    }
}
```

And the limit and skip options:
```
{
    limit: number // Max is set in .env, defaults to 100
    skip: number
}
```

Examples:

- Retrieve contacts from user 1 that have the same state as contact 624  
`GET /v1/contacts/1?same[id]=624&same[keys][]=state`  
- Retrieve contacts from user 1 that have email = tgarment1b@jimdo.com  
`GET /v1/contacts/1?email=tgarment1b@jimdo.com`  


### POST /v1/users
Creates a new user, for testing purpose only  
Example:  
`POST /v1/users`  
Body:  
```
{}
```