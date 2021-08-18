const stripeLib = require("stripe");

const stripe = stripeLib(process.env.STRIPE_KEY);

module.exports = stripe;
