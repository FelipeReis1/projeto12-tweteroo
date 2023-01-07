import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    return res.status(400).send("Preencha todos os campos antes de enviar");
  }
  users.push({ username, avatar });
  res.status(201).send("OK");
});

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT} `));
