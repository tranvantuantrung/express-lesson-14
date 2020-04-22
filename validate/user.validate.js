const db = require("../db.js");

module.exports.create = (req, res, next) => {
  let errors = [];

  if (!req.body.name) {
    errors.push("Name is required.");
  }

  if (req.body.name.split("").length > 30) {
    errors.push("Name must be less than 30 characters.");
  }

  if (errors.length) {
    res.render("users/index", {
      users: db.get("users").value(),
      errors,
      values: req.body
    });

    return;
  }

  next();
};
