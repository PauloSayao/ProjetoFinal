const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname)));

const users = [
  { name: "admin", password: "123456", role: "admin", email: "admin@email.com" },
  { name: "user", password: "123456", role: "user", email: "user@email.com" }
];

app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const user = users.find(u => u.name === name && u.password === password);

  if (!user) {
    return res.status(401).json({
      message: "Usuário ou senha incorretos!"
    });
  }

  return res.status(200).json({
    id: users.indexOf(user) + 1,
    name: user.name,
    email: user.email,
    role: user.role
  });
});

app.post("/register", (req, res) => {
  const { name, password, email, fullName } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ message: "Preencha todos os campos obrigatórios!" });
  }

  const userExists = users.find(u => u.name === name || u.email === email);

  if (userExists) {
    return res.status(409).json({ message: "Usuário ou e-mail já cadastrado!" });
  }

  const newUser = {
    name,
    password,
    email,
    fullName,
    telephone,
    role: "user" // todos os novos são usuários comuns
  };

  users.push(newUser);

  return res.status(201).json({ message: "Usuário registrado com sucesso!" });
});


const pedidosSalvos = [];
let pedidoIdCounter = 1;

app.post("/pedidos", (req, res) => {
  const { produtos } = req.body;

  if (!produtos || !Array.isArray(produtos)) {
    return res.status(400).json({ message: "Pedido inválido!" });
  }

  const novoPedido = {
    id: pedidoIdCounter++,
    produtos
  };

  pedidosSalvos.push(novoPedido);
  return res.status(201).json({ message: "Pedido salvo com sucesso!" });
});

app.get("/pedidos", (req, res) => {
  return res.status(200).json({ pedidos: pedidosSalvos });
});

app.delete("/pedidos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = pedidosSalvos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Pedido não encontrado!" });
  }

  pedidosSalvos.splice(index, 1);
  return res.status(200).json({ message: "Pedido removido com sucesso!" });
});

app.delete("/pedidos", (req, res) => {
  pedidosSalvos.length = 0;
  return res.status(200).json({ message: "Todos os pedidos foram removidos!" });
});
app.listen(3001, () => {
  console.log("API running on http://localhost:3001/");
});
