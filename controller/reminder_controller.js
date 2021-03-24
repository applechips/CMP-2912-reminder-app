let database = require("../database").Database;
const fs = require('fs').promises;
const { forwardAuthenticated, ensureAuthenticated } = require('../middleware/checkAuth');

let remindersController = {
  list: async (req, res) => {
    console.log('--reminderController LIST', req.user.username)
    const userIndex = database.findIndex((data) => data.username === req.user.username)
    console.log('userind', userIndex)
    res.render("reminder/index", { reminders: database[userIndex].reminders });
    // try {
    //   const usersFromDatabase = await getUsersFromDatabase();
    //   const remindersFromDatabase = await getRemindersFromDatabase(usersFromDatabase);
    //   res.render("reminder/index", { reminders: remindersFromDatabase })
    // } catch (error) {
    //   console.log(error);
    // }
  
  },

  new: (req, res) => {
    console.log('--new req', req.user)
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    const userIndex = database.findIndex((data) => data.username === req.user.username)
    let searchResult = database[userIndex].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[userIndex].reminders });
    }
  },

  create: (req, res) => {
    const userIndex = database.findIndex((data) => data.username === req.user.username)
    let reminder = {
      id: database[userIndex].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database[userIndex].reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    console.log('--edit')
    const userIndex = database.findIndex((data) => data.username === req.user.username)
    let reminderToFind = req.params.id;
    let searchResult = database[userIndex].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // need to parse the boolean string to actual boolean
    const userIndex = database.findIndex((data) => data.username === req.user.username)
    req.body.completed = req.body.completed === 'false' ? false : true;
    let reminderToFind = req.params.id;
    let index = database[userIndex].reminders.findIndex((reminder) => reminder.id == reminderToFind);

    database[userIndex].reminders[index] = { id: reminderToFind, ...req.body}
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    const userIndex = database.findIndex((data) => data.username === req.user.username)
    let reminderToFind = req.params.id;
    let index = database[userIndex].reminders.findIndex((reminder) => reminder.id == reminderToFind);

    database[userIndex].reminders.splice(index, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
