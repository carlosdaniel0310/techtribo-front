const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db/db.json");
const middlewares = jsonServer.defaults();

// Middleware padrão
server.use(middlewares);

// 🔥 CORS liberado para funcionar no Netlify e no celular
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Rotas do json-server
server.use(router);

// Porta do Render
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("JSON Server rodando na porta " + port);
});
