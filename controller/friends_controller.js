let database = require('../database').Database;
const fetch = require('node-fetch');
const fs = require('fs').promises;

const getFriendsList = (req) => {
		// get list of all users & their friend status
		const userIndex = database.findIndex((data) => data.username === req.user.username);
    const friendsList =  database[userIndex].friends;
    // clone db to we are not changing it
		const users = JSON.parse(JSON.stringify(database)) ;
    users.splice(userIndex, 1);
    users.forEach((user) => {
      if(user.id === req.user.id) {
        user.me = true;
      }
      if (friendsList.find((friend) => friend.id === user.id)) {
        user.friends = true;
      } else {
        user.friends = false
      }
 
    } )

    return users;
}
let friendsController = {
	list: async (req, res) => {
		console.log('--friendsController.LIST', req.user.username);

    const users = getFriendsList(req)

		res.render('friends/index', { users: users });
	},

	add: (req, res) => {
		console.log('--friendsController.ADD', req.body);
		const userIndex = database.findIndex((data) => data.username === req.user.username);
    const newFriend = {
      id: Number.parseInt(req.body.id),
      name: req.body.name,
      image: req.body.image

    };
    newFriend.id = Number.parseInt(req.body.id)

    database[userIndex].friends.push(newFriend);

    const users = getFriendsList(req)
  
    // re-render friends list w/ updated information
		res.render('friends/index', { users: users });
	},

	delete: (req, res) => {
    console.log('---friendsController.DELETE')
		const userIndex = database.findIndex((data) => data.username === req.user.username);
    console.log(req.params.id === 4)
    const friendToDeleteIndex = database[userIndex].friends.findIndex((data) => data.id === Number.parseInt(req.params.id));

		database[userIndex].friends.splice(friendToDeleteIndex, 1);
		res.redirect('/friends');
	}
};

module.exports = friendsController;
