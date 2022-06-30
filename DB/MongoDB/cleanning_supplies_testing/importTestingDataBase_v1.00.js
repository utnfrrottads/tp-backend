/* eslint-disable */
const articlesToInsert = [
  {
    code: 'a130',
    description: 'Esponja verde y amarilla',
    category: { name: 'cocina', description: 'Articulos de limpieza para la cocina' },
    price: { value: 75, sinceDate: new Date('2021-01-01T03:00:00Z') },
    providers: [{ name: 'coto' }, { name: 'jumbo' }],
    urlImage: 'images/esponja_verde',
    stock: 8,
    amountToOrder: 10,
    orderPoint: 5
  },
  {
    code: 'a131',
    description: 'Escoba de interior',
    category: { name: 'general', description: 'Articulos para la liempieza general de la casa' },
    price: { value: 250, sinceDate: new Date('2021-01-01T03:00:00Z') },
    providers: [{ name: 'coto' }, { name: 'jumbo' }],
    urlImage: 'images/escoba_interior',
    stock: 8,
    amountToOrder: 10,
    orderPoint: 5
  },
  {
    code: 'a141',
    description: 'Esponja metalica',
    category: { name: 'cocina', description: 'Articulos de limpieza para la cocina' },
    price: { value: 75, sinceDate: new Date('2021-01-01T03:00:00Z') },
    providers: [{ name: 'coto' }, { name: 'jumbo' }],
    urlImage: 'images/esponja_metalica',
    stock: 8,
    amountToOrder: 10,
    orderPoint: 5
  },
  {
    code: 'a120',
    description: 'Escoba de paja',
    category: { name: 'general', description: 'Articulos para la liempieza general de la casa' },
    price: { value: 270, sinceDate: new Date('2021-01-01T03:00:00Z') },
    providers: [{ name: 'coto' }, { name: 'jumbo' }],
    urlImage: 'images/escoba_paja',
    stock: 8,
    amountToOrder: 10,
    orderPoint: 5
  }
];

const customersToInsert = [
  {
    username: 'pepe123',
    name: 'pepe',
    lastName: 'gomez',
    password: 'securepass',
    dni: '12123123',
    compras: [ {amount: 1, articleId: {_id: "6038196b268e2cb3104e94e9"}}]
  }
];

module.exports = { articles: articlesToInsert, customers: customersToInsert };
