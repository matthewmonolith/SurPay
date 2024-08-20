const keys = require("../../config/keys");
const stripe = require("stripe")(keys.STRIPESECRETKEY);

module.exports = (app) => {
  app.post("/api/stripe", async (req, res) => {
    if (!req.user) {
      return res
        .status(401)
        .send({ error: "You must be logged in to pay for credits!" });
    }

    const res = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      soource: req.body.id,
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
