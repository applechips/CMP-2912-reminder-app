const userModel = require("../database").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  console.log('--getUserByEmailAndPassword', isUserValid(user, password))
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  console.log('--getuserbyid', id)
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const addUser = (user) => {
  userModel.addUser(user);
}

function isUserValid(user, password) {
  console.log('--isUserValid')
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  addUser
};
