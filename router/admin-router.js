const express = require("express");
const router = express.Router();
const userAuthentication = require("../middleware/auth-middleware");
const AdminMiddleware = require("../middleware/admin-middleware");
const {
  UserList,
  ContactQuery,
  addService,
  deleteUserByID,
  singleUserDataByID,
  updateUserByID,
  deleteContactQueryList,
} = require("../controllers/admin-controller");

router.get("/user-list", userAuthentication, AdminMiddleware, UserList);
router.get("/contact-query-list", ContactQuery);
router.post("/add-service", addService);
router.delete(
  "/delete-user/:id",
  userAuthentication,
  AdminMiddleware,
  deleteUserByID
);
router.get(
  "/single-user/:id",
  userAuthentication,
  AdminMiddleware,
  singleUserDataByID
);
router.patch(
  "/update-user/:id",
  userAuthentication,
  AdminMiddleware,
  updateUserByID
);
router.delete(
  "/delete-contact-query-list/:id",
  userAuthentication,
  AdminMiddleware,
  deleteContactQueryList
);

module.exports = router;
