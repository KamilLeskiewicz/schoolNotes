const express = require("express");
const router = express.Router();
const dataService = require("./service/data");

router.get("/api/data", dataService.getNotes);

module.exports = router;
