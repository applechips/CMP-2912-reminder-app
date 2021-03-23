module.exports = {
  ensureAuthenticated: function (req, res, next) {
    console.log('--ensure', req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    console.log('-forwardauth', req.isAuthenticated())
    if (!req.isAuthenticated()) {
      return next();
    }

    res.redirect("/reminders");
  },
};
