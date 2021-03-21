module.exports = {
  ensureAuthenticated: function (req, res, next) {
    console.log('-ensureauth')
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    console.log('-forwardauth')
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
  },
};
