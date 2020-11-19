var { authenticate } = require("./signincontrol.js");
var express = require('express');
var router = express.Router();



router.get("/", (req, res) => {
  res.render("signin", { message: req.flash("message"),username: req.session.username });
});

router.post("/", authenticate());



module.exports = router;