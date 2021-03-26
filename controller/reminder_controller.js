let database = require('../database').Database;
const fs = require('fs').promises;

let remindersController = {
	list: async (req, res) => {
		console.log('--reminderController LIST', req.user.username);
		// check if user has friends & show their reminders
		let friendsReminders = [];
		if (req.user.friends.length > 0) {
			req.user.friends.forEach((friend) => {
				const index = database.findIndex((data) => data.id === friend.id);
				friendsReminders.push({
					reminders: database[index].reminders,
					name: friend.name
				});
			});
		}

    // get your own reminders
		const userIndex = database.findIndex((data) => data.username === req.user.username);

		res.render('reminder/index', { name:database[userIndex].name, reminders: database[userIndex].reminders, friendsReminders: friendsReminders });

	},

	new: (req, res) => {
		console.log('--new req', req.user);
		res.render('reminder/create');
	},

	listOne: (req, res) => {
		let reminderToFind = req.params.id;
		const userIndex = database.findIndex((data) => data.username === req.user.username);
		let searchResult = database[userIndex].reminders.find(function(reminder) {
			return reminder.id == reminderToFind;
		});
		if (searchResult != undefined) {
			res.render('reminder/single-reminder', { reminderItem: searchResult });
		} else {
			res.render('reminder/index', { reminders: database[userIndex] });
		}
	},

	create: (req, res) => {
		const userIndex = database.findIndex((data) => data.username === req.user.username);
		let reminder = {
			id: database[userIndex].reminders.length + 1,
			title: req.body.title,
			description: req.body.description,
			completed: false,
			tasks: [],
			tags: []
		};

		let taskCount = 0;
		console.log(req.body);
		for (key in req.body) {
			if (key.startsWith('task')) {
				if (req.body[key].length > 0) {
					reminder.tasks.push({
						id: ++taskCount,
						task: req.body[key],
						completed: false
					});
				}
			}
		}

		let tagCount = 0;
		for (key in req.body) {
			if (key.startsWith('tag')) {
				if (req.body[key].length > 0) {
					reminder.tags.push(req.body[key]);
				}
			}
		}

		database[userIndex].reminders.push(reminder);
		res.redirect('/reminders');
	},

	edit: (req, res) => {
		const userIndex = database.findIndex((data) => data.username === req.user.username);
		let reminderToFind = req.params.id;
		let searchResult = database[userIndex].reminders.find(function(reminder) {
			return reminder.id == reminderToFind;
		});
		res.render('reminder/edit', { reminderItem: searchResult });
	},

	update: (req, res) => {
		console.log('--update', req.body);
		// need to parse the boolean string to actual boolean
		const userIndex = database.findIndex((data) => data.username === req.user.username);
		req.body.completed = req.body.completed === 'false' ? false : true;
		let reminderToFind = req.params.id;
		let index = database[userIndex].reminders.findIndex((reminder) => reminder.id == reminderToFind);

		// database[userIndex].reminders[index] = { id: reminderToFind, ...req.body}
		// res.redirect("/reminders");
	},

	delete: (req, res) => {
		const userIndex = database.findIndex((data) => data.username === req.user.username);
		let reminderToFind = req.params.id;
		let index = database[userIndex].reminders.findIndex((reminder) => reminder.id == reminderToFind);

		database[userIndex].reminders.splice(index, 1);
		res.redirect('/reminders');
	}
};

module.exports = remindersController;
