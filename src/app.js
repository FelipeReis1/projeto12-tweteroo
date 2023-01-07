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
    return res.status(422).send("Preencha todos os campos antes de enviar");
  }
  users.push({ username, avatar });
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  if (!username || !tweet) {
    return res.status(422).send("Preencha todos os campos antes de enviar");
  }
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.sendStatus(401);
  }
  tweets.push({ user, tweet });
  res.status(201).send("OK");
});

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT} `));
