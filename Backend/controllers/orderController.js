import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import User from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });
    const frontend_url = "http://localhost:5173";

    // Budowanie line_items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "PLN",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Assuming the item price is in PLN, multiplied by 100 to convert to the smallest currency unit.
      },
      quantity: item.quantity,
    }));

    // Logowanie line_items
    console.log("Line Items:", JSON.stringify(line_items, null, 2));

    // Sprawdzenie, czy line_items nie jest pusty
    if (line_items.length === 0) {
      throw new Error("No items in the order");
    }

    // Utworzenie sesji płatności z Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "error" });
  }
};

export { placeOrder };

