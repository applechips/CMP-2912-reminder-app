let database = require("../database");

let authController = {
  login: (req, res) => {
    console.log('--controller: login')

    res.render("auth/login");
  },

  register: (req, res) => {
    console.log('--controller: register')
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    console.log('--controller: login submit')
    res.render("reminder/index")
    // implement
  },

  registerSubmit: (req, res) => {
    console.log('submit')
    // implement
  },
};

module.exports = authController;
