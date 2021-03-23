const express = require("express");
const remindersController = require("../controller/reminder_controller");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/reminders", ensureAuthenticated, remindersController.list);

router.get("/reminder/new",  ensureAuthenticated, remindersController.new);

router.get("/reminder/:id",  ensureAuthenticated, remindersController.listOne);

// router.get("/reminder/:id/edit", ensureAuthenticated,reminderController.edit);

router.post("/reminder/", ensureAuthenticated,remindersController.create);

router.post("/reminder/update/:id", ensureAuthenticated,remindersController.update);

router.post("/reminder/delete/:id", ensureAuthenticated,remindersController.delete);




module.exports = router;
