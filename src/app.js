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
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  users.push({ username, avatar });
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  if (!username || !tweet) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.sendStatus(401);
  }
  tweets.push({ user, tweet });
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  let lastTenTweets = [];
  lastTenTweets = tweets.slice(-10).reverse();
  const finalTweets = [];
  lastTenTweets.map((l) => {
    finalTweets.push({
      username: l.user.username,
      avatar: l.user.avatar,
      tweet: l.tweet,
    });
  });
  res.send(finalTweets);
});

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT} `));
