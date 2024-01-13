const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");
const {
  signupSchema,
  loginSchema,
} = require("../validation/auth-validator.js");
const validator = require("../middleware/validate-middlewarw.js");
const userAuthantication = require("../middleware/auth-middleware.js");

router.route("/").get(authController.home);
router
  .route("/register")
  .post(validator(signupSchema), authController.register);
router.route("/login").post(validator(loginSchema), authController.login);

router.route("/user").get(userAuthantication, authController.user);
module.exports = router;
