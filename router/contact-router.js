const express = require("express");
const router = express.Router();
const contactFrom = require("../controllers/contact-controller");
const userAuthantication = require("../middleware/auth-middleware.js");
router.post("/contact", userAuthantication, contactFrom);

module.exports = router;
