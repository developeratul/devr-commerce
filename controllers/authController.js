module.exports = {
  registerUser: async function (req, res) {
    try {
      res.json({ message: "nice person" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
