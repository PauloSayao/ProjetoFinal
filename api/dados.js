let users = [
  { name: "admin", password: "123456", role: "admin", email: "admin@email.com", telephone: "123456789" },
  { name: "user", password: "123456", role: "user", email: "user@email.com", telephone: "987654321" }
];

let produtos = [
  { id: 1, name: 'Trufa de Chocolate', price: 5.0, image: 'trufachocolate.jpg', descricao: 'Deliciosa trufa recheada com ganache de chocolate meio amargo.', quantity: 1, ativo: true },
  { id: 2, name: 'Trufa de Maracujá', price: 5.5, image: 'trufamaracuja.jpg', descricao: 'Trufa cremosa com recheio de maracujá e cobertura branca.', quantity: 1, ativo: true },
  { id: 3, name: 'Trufa de Coco', price: 5.0, image: 'trufacoco.jpg', descricao: 'Recheio de coco com cobertura de chocolate ao leite.', quantity: 1, ativo: true },
  { id: 4, name: 'Trufa de Limão', price: 5.5, image: 'trufalimão.jpg', descricao: 'Trufa refrescante com recheio de limão siciliano.', quantity: 1, ativo: false },
  { id: 5, name: 'Trufa de Morango', price: 5.5, image: 'trufamorango.jpg', descricao: 'Trufa com recheio de morango e cobertura de chocolate ao leite.', quantity: 1, ativo: false }
];

let pedidos = [];

export { users, produtos, pedidos };
