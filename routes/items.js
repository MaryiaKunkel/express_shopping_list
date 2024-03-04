const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  res.json({ name: "item", price: "price" });
});

router.post("/");

router.get("/:name", (req, res) => {
  const item = items.find((i) => i.name === +req.params.is);
  res.json({ item });
});

// router.post("/:name");

// router.delete("/:name");

module.exports = router;
