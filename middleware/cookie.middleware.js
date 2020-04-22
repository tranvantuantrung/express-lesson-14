const db = require("../db.js");
const shortid = require("shortid");

module.exports = (req, res, next) => {
  if (!req.cookies.cookieId) {
    let cookieId = shortid.generate();
    res.cookie("cookieId", cookieId);
    db.get("cookies")
      .push({ id: cookieId, count: 0 })
      .write();
  } else {
    let count = db
      .get("cookies")
      .find({ id: req.cookies.cookieId })
      .value().count;

    count += 1;

    console.log({ cookie: count });

    db.get("cookies")
      .find({ id: req.cookies.cookieId })
      .assign({ count: count })
      .write();
  }

  next();
};
