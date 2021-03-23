const express = require("express");
const path = require("path");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const { ensureAuthenticated, isAdmin, forwardAuthenticated } = require("./middleware/checkAuth");
const app = express();
const passport = require("./middleware/passport");
const indexRoute = require("./routes/indexRoute");
const authRoute = require("./routes/authRoute");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});


// app.get("/reminders", isAuthenticated, reminderController.list);

// app.get("/reminder/new", reminderController.new);

// app.get("/reminder/:id", reminderController.listOne);

// app.get("/reminder/:id/edit", reminderController.edit);

// app.post("/reminder/", reminderController.create);

// // Implement this yourself
// app.post("/reminder/update/:id", reminderController.update);

// // Implement this yourself
// app.post("/reminder/delete/:id", reminderController.delete);


