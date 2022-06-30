/* eslint-disable */

const articlesToInsert = [
  {
    _id: ObjectId('6053d968cda18f3ccae92691'),
    code: 'a130',
    description: 'Esponja verde y amarilla',
    category: { name: 'cocina', description: 'Articulos de limpieza para la cocina' },
    prices: [
      { value: 75, sinceDate: ISODate('2021-01-01T03:00:00.001Z') },
      { value: 85, sinceDate: ISODate('2021-01-30T03:00:00.002Z') },
      { value: 80, sinceDate: ISODate('2021-01-15T03:00:00.003Z') }
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
    category: { name: 'general', description: 'Articulos para la liempieza general de la casa' },
    prices: [
      { value: 250, sinceDate: ISODate('2021-01-01T03:00:02.000Z') },
      { value: 300, sinceDate: ISODate('2021-01-30T03:00:02.001Z') },
      { value: 275, sinceDate: ISODate('2021-01-15T03:00:02.002Z') }
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
    urlImage: 'assets/images/escoba_interior.jpg',
    stock: 8,
    amountToOrder: 10,
    orderPoint: 5
  },
  {
    _id: ObjectId('6053d968cda18f3ccae92693'),
    code: 'a141',
    description: 'Esponja metalica',
    category: { name: 'cocina', description: 'Articulos de limpieza para la cocina' },
    prices: [
      { value: 75, sinceDate: ISODate('2021-01-01T03:00:03.000Z') },
      { value: 85, sinceDate: ISODate('2021-01-30T03:00:03.001Z') },
      { value: 80, sinceDate: ISODate('2021-01-15T03:00:03.002Z') }
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
    category: { name: 'general', description: 'Articulos para la liempieza general de la casa' },
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
      }
    ],
    urlImage: 'assets/images/escoba_paja.jpg',
    stock: 8,
    amountToOrder: 10,
    orderPoint: 5
  }
];

const customersToInsert = [
  {
    _id: ObjectId('6053d968cda18f3ccae92695'),
    username: 'pepe123',
    name: 'pepe',
    lastName: 'gomez',
    password: '$2a$10$mey.TbiHpD1/1SZIikSg1u5a/E1SAlm49z7fDnKOTQeVgC5mWfXg.',
    dni: '12123123',
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
  }
];

module.exports = { articles: articlesToInsert, customers: customersToInsert };
