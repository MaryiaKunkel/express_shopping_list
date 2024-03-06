// items.js
const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb");

router.get("/", (req, res, next) => {
  try {
    res.json({ items });
  } catch (e) {
    return next(e);
  }
});

router.post("/", (req, res, next) => {
  try {
    if (!req.body.name) throw new ExpressError("Name is required", 400);
    const newItem = { name: req.body.name };
    items.push(newItem);
    return res.status(201).json({ item: newItem });
  } catch (e) {
    return next(e);
  }
});

router.get("/:name", (req, res, next) => {
  try {
    const foundItem = items.find((item) => item.name === req.params.name);
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404);
    }
    res.json({ item: foundItem });
  } catch (e) {
    return next(e);
  }
});

router.patch("/:name", (req, res, next) => {
  try {
    const foundItem = items.find((item) => item.name === req.params.name);
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404);
    }
    foundItem.name = req.body.name;
    res.json({ item: foundItem });
  } catch (e) {
    return next(e);
  }
});

router.delete("/:name", (req, res, next) => {
  try {
    const foundIndex = items.findIndex((item) => item.name === req.params.name);
    if (foundIndex === -1) {
      throw new ExpressError("Item not found", 404);
    }
    items.splice(foundIndex, 1);
    res.json({ message: "Deleted" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
