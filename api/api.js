const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({
        message: "O campo de usuário ou senha não foi preenchido!",
      });
    }

    if (name !== "admin" || password !== "123456") {
      return res.status(401).json({
        message:
          "O nome de usuário ou senha está incorreto ou não foi cadastrado!",
      });
    }

    return res.status(200).json({
      id: 1,
      name: "admin",
      email: "admin@email.com",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Falha na comunicação com o servidor!",
      error: String(error),
    });
  }
});

app.get("/vehicles", (req, res) => {
  try {
    const vehicles = [
      {
        id: 1,
        vehicle: "Ranger",
        volumetotal: 145760,
        connected: 70000,
        softwareUpdates: 27550,
        img: "http://localhost:3001/img/ranger.png",
      },
      {
        id: 2,
        vehicle: "Mustang",
        volumetotal: 1500,
        connected: 500,
        softwareUpdates: 750,
        img: "http://localhost:3001/img/mustang.png",
      },
      {
        id: 3,
        vehicle: "Territory",
        volumetotal: 4560,
        connected: 4000,
        softwareUpdates: 3050,
        img: "http://localhost:3001/img/territory.png",
      },
      {
        id: 4,
        vehicle: "Bronco Sport",
        volumetotal: 7560,
        connected: 4060,
        softwareUpdates: 2050,
        img: "http://localhost:3001/img/broncoSport.png",
      },
    ];

    return res.status(200).json({ vehicles });
  } catch (error) {
    return res.status(500).json({
      message: "Falha na comunicação com o servidor!",
    });
  }
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
