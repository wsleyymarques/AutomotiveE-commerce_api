require("dotenv").config();
const app = require("./app");

const PORT = process.env.APP_PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

