const express = require('express');
const goodsRouter = require('./routes/goods')
const postRouter = require('./routes/post')
const cartsRouter = require("./routes/carts")
const connect = require('./schemas');

connect();

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi')
})
app.use('/api', [goodsRouter, cartsRouter])


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

