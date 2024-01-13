const express = require('express');
const router = express.Router();
const { service } = require("../controllers/service-controller");
router.get("/services", service);

module.exports = router;