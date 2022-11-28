// /routes/goods.js
const express = require("express");
const Cart = require('../schemas/cart');

const router = express.Router();

const Goods = require("../schemas/goods");

router.post('/goods/:goodsId/cart', async (req, res) => {

  const goodsId = req.params.goodsId;
  const quantity = req.body.quantity;

  const existCarts = await Cart.find({ goodsId });;
  if (existCarts.length > 0) {
    return res.status(400).json({ success: false, errorMessage: '이미 장바구니에 존재하는 상품입니다.' })
  };

  await Cart.create({ goodsId, quantity });
  res.json({ success: 'success' })
})

router.put('/goods/:goodsId/cart', async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existCarts = await Cart.find({ goodsId });;
  if (existCarts.length) {
    await Cart.updateOne({ goodsId: goodsId }, { $set: { quantity: quantity } })
  };

  res.status(200).json({ success: true })

})

router.delete('/goods/:goodsId/cart', async (req, res) => {

  const { goodsId } = req.params;

  const existCarts = Cart.findOne({ goodsId })
  if (existCarts) {
    await Cart.deleteOne({ goodsId })
  }

  res.json({ success: true })

})



router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

  res.json({ goods: createdGoods });
});

router.get("/goods/:goodsId", (req, res) => {
  const params = req.params;
  console.log(params)

  res.json({ "goods": goods.filter(good => good.goodsId == params.goodsId) })
});


module.exports = router