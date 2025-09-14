const { Cart, CartItem } = require("../models/cart");

async function addCartItem(req, res) {
  try {
    const { userId, productId, quantity, unit_price, size, color } = req.body;

    if (!userId || !productId || !quantity || !unit_price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const cart = await Cart.findOne({
      where: {
        userId: userId,
        status: "active",
      },
    });

    if (!cart) {
      cart = await Cart.create({
        userId: userId,
        status: "active",
        total: 0,
      });
    }

    const cartItem = await CartItem.create({
      cartId: cart.id,
      productId: productId,
      quantity: quantity,
      unit_price: unit_price,
      size: size,
      color: color,
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.subtotal = cartItem.quantity * cartItem.unit_price;
      await cartItem.save();
    } else {
      await CartItem.create({
        cartId: cart.id,
        productId: productId,
        quantity: quantity,
        unit_price: unit_price,
        size: size,
        color: color,
        subtotal: quantity * unit_price,
      });
    }

    const itens = await CartItem.findAll({
      where: {
        cartId: cart.id,
      },
    });

    const totalFinal = itens.reduce((totalFinal, item) => {
      return totalFinal + item.parseFloat(item.subtotal);
    }, 0);

    cart.total = totalFinal;
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Item adicionado com sucesso",
      data: {
        cartId: carrinho.id,
        totalItems: itens.length,
        cartTotal: totalFinal.toFixed(2),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
