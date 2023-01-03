/* eslint-disable */

if (db.articles) {
  db.articles.drop();
  db.collection('articles');
  // db.articles.createIndex({code: 1}, {unique: true})
}
db.articles.insert([
  {
    _id: ObjectId('6053d968cda18f3ccae92691'),
    code: 'a130',
    description: 'Esponja verde y amarilla',
    category: { name: 'cocina', description: 'Articulos de limpieza para la cocina' },
    isBestSeller: true,
    prices: [
      { value: 75, sinceDate: ISODate('2021-01-01T03:00:00.301Z') },
      { value: 85, sinceDate: ISODate('2021-01-30T03:00:00.302Z') },
      { value: 80, sinceDate: ISODate('2021-01-15T03:00:00.303Z') }
    ],
    providers: [
      {
        cuit: '11-12345678-1',
        adress: 'calle falsa 123',
        businessName: 'coto',
        phoneNumber: '3417893456'
      },
      {
        cuit: '11-12345678-2',
        adress: 'calle falsa 123',
        businessName: 'jumbo',
        phoneNumber: '3417893456'
      }
    ],
    urlImage: 'assets/images/esponja_verde.jpg',
    stock: 8,
    amountToOrder: 10,
    orderPoint: 5
  },
  {
    _id: ObjectId('6053d968cda18f3ccae92692'),
    code: 'a131',
    description: 'Escoba de interior',
    isBestSeller: true,
    category: { name: 'general', description: 'Articulos para la liempieza general de la casa' },
    prices: [
      { value: 250, sinceDate: ISODate('2021-01-01T03:00:02.200Z') },
      { value: 300, sinceDate: ISODate('2021-01-30T03:00:02.201Z') },
      { value: 275, sinceDate: ISODate('2021-01-15T03:00:02.202Z') }
    ],
    providers: [
      {
        cuit: '11-12345558-2',
        adress: 'calle verdadera 789',
        businessName: 'Queen of clean',
        phoneNumber: '3417893456'
      },
      {
        cuit: '11-12345678-1',
        adress: 'calle falsa 123',
        businessName: 'coto',
        phoneNumber: '3417893456'
      },
      {
        cuit: '11-12345678-2',
        adress: 'calle falsa 123',
        businessName: 'jumbo',
        phoneNumber: '3417893456'
      },
      {
        cuit: '11-12346668-2',
        adress: 'calle verdadera 791',
        businessName: 'Super Limpieza',
        phoneNumber: '3417877456'
      }
    ],
    urlImage: 'assets/images/escoba_interior.jpg',
    stock: 8,
    amountToOrder: 10,
    orderPoint: 5
  },
  {
    _id: ObjectId('6053d968cda18f3ccae92693'),
    code: 'a141',
    description: 'Esponja metalica',
    isBestSeller: false,
    category: { name: 'cocina', description: 'Articulos de limpieza para la cocina' },
    prices: [
      { value: 75, sinceDate: ISODate('2021-01-01T03:00:03.100Z') },
      { value: 85, sinceDate: ISODate('2021-01-30T03:00:03.101Z') },
      { value: 80, sinceDate: ISODate('2021-01-15T03:00:03.102Z') }
    ],
    providers: [
      {
        cuit: '11-12345678-1',
        adress: 'calle falsa 123',
        businessName: 'coto',
        phoneNumber: '3417893456'
      },
      {
        cuit: '11-12345678-2',
        adress: 'calle falsa 123',
        businessName: 'jumbo',
        phoneNumber: '3417893456'
      }
    ],
    urlImage: 'assets/images/esponja_metalica.jpg',
    stock: 8,
    amountToOrder: 10,
    orderPoint: 5
  },
  {
    _id: ObjectId('6053d968cda18f3ccae92694'),
    code: 'a120',
    description: 'Escoba de paja',
    isBestSeller: false,
    category: { name: 'Baño', description: 'Articulos para la limpieza del baño'},
    prices: [
      { value: 270, sinceDate: ISODate('2021-01-01T03:00:01.000Z') },
      { value: 350, sinceDate: ISODate('2021-01-30T03:00:01.001Z') },
      { value: 300, sinceDate: ISODate('2021-01-15T03:00:01.002Z') }
    ],
    providers: [
      {
        cuit: '11-12345678-1',
        adress: 'calle falsa 123',
        businessName: 'coto',
        phoneNumber: '3417893456'
      },
      {
        cuit: '11-12345678-2',
        adress: 'calle falsa 123',
        businessName: 'jumbo',
        phoneNumber: '3417893456'
      },
      {
        cuit: '88-99965432-1',
        adress: 'Cordoba 3450',
        businessName: 'Mercado del Patio',
        phoneNumber: '3417893456'
      }
    ],
    urlImage: 'assets/images/escoba_paja.jpg',
    stock: 8,
    amountToOrder: 10,
    orderPoint: 5
  }
]);

// ------ Customers -------------------------------------------------

if (db.customers) {
  db.customers.drop();
  db.collection('customers');
}
db.customers.insert([
  {
    _id: ObjectId('6053d968cda18f3ccae92695'),
    username: 'pepe123',
    userRole: 'customer',
    name: 'pepe',
    lastName: 'gomez. PWD=pepe123',
    password: '$2a$10$Jbq1.KINmCwq5QGGaagkd.FIdKpH.Qh2WJ8YLrZ7/DE9nArnFpnXS',
    dni: '12123123',
    accountBalance: 100000,
    purchases: [
      {
        date: ISODate('2021-02-15T03:00:04.001Z'),
        purchaseLines: [
          {
            amount: 1,
            article: ObjectId('6053d968cda18f3ccae92691')
          }
        ]
      }
    ],
    carts: [
      {
        name: 'Wish List',
        date: ISODate('2021-02-15T03:00:04.001Z'),
        cartLines: [
          {
            amount: 1,
            article: ObjectId('6053d968cda18f3ccae92691')
          }
        ]
      }
    ]
  },
  {
    _id: ObjectId('6053d968cda18f3ccae92696'),
    username: 'juan123',
    userRole: 'admin',
    name: 'juan',
    lastName: 'perez. PWD=pepe123',
    password: '$2a$10$Jbq1.KINmCwq5QGGaagkd.FIdKpH.Qh2WJ8YLrZ7/DE9nArnFpnXS',
    dni: '12123456',
    accountBalance: 500
  }
]);
