let database = require('../database').Database;
let userModel = require('../database').userModel;
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function formatDate(date) {
	const newDate = new Date(date).toString().split(" ");
	const formattedDate = newDate[0] + " " + newDate[1] +  " " + newDate[2] +  " " + newDate[3]
	return formattedDate;
}

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

		// fetch current weather in vancouver
		let weather = {
			type: '',
			description: '',
			temp: '',
			imageUrl: ''
		};

		fetch('https://api.openweathermap.org/data/2.5/onecall?lat=49.2827&lon=-123.1207&exclude=minutely,hourly,daily,alerts&units=metric&appid=' + process.env.OPEN_WEATHER_API_KEY)
		.then(res => res.json())
		.then (json => {
			console.log(json.current);
			const response = json.current.weather[0];
			console.log(json.current.temp)
			weather.type = response.main;
			weather.description = response.description;
			weather.temp = Math.round(json.current.temp);
			weather.imageUrl = 'http://openweathermap.org/img/wn/' + response.icon + '@2x.png';
			console.log(weather);
		})
		.then(() => {
			res.render('reminder/index', {
				name: database[userIndex].name,
				reminders: database[userIndex].reminders,
				friendsReminders: friendsReminders,
				weather
			});
		})
	},

	new: (req, res) => {
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
		console.log(req.body)
		const userIndex = database.findIndex((data) => data.username === req.user.username);
	
		let reminder = {
			id: database[userIndex].reminders.length + 1,
			title: req.body.title,
			description: req.body.description,
			date: req.body.date,
			formattedDate: formatDate(req.body.date),
			formattedTime: formatAMPM(new Date(req.body.date)),
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

		for (key in req.body) {
			if (key.startsWith('tag')) {
				if (req.body[key].length > 0) {
					reminder.tags.push(req.body[key]);
				}
			}
		}

		console.log(reminder)
		database[userIndex].reminders.push(reminder);
		console.log(database[userIndex].reminders)
		res.redirect('/reminders');
	},

	edit: (req, res) => {
		const userDb = userModel.findById(req.user.id);
		let reminderToFind = req.params.id;
		let searchResult = userDb.reminders.find(function(reminder) {
			return reminder.id == reminderToFind;
		});
		res.render('reminder/edit', { reminderItem: searchResult });
	},

	update: (req, res) => {
		console.log('---UPDATE REMINDER');
		console.log('-body', req.body);
		const userDb = userModel.findById(req.user.id);
		let reminderToFind = Number.parseInt(req.params.id);
		const reminderIndex = userDb.reminders.findIndex((data) => data.id === reminderToFind);

		const remindersDb = userDb.reminders[reminderIndex];
		if (req.body.taskChange) {
			let taskIndex = userDb.reminders[reminderIndex].tasks.findIndex(
				(task) => task.id === Number.parseInt(req.body.taskChange)
			);
			let currentTask = userDb.reminders[reminderIndex].tasks[taskIndex];

			userDb.reminders[reminderIndex].tasks[taskIndex] = {
				id: currentTask.id,
				task: currentTask.task,
				completed: !currentTask.completed
			};

			let searchResult = userDb.reminders.find(function(reminder) {
				return reminder.id == reminderToFind;
			});

			res.render('reminder/single-reminder', { reminderItem: searchResult });
		}

		if (req.body.title) {
			req.body.completed = req.body.completed === 'false' ? false : true;

			let reminder = {
				id: req.params.id,
				title: req.body.title,
				description: req.body.description,
				completed: req.body.completed,
				tasks: [],
				tags: []
			};

			remindersDb.title = req.body.title;
			remindersDb.description = req.body.description;
			remindersDb.date = req.body.date;
			remindersDb.completed = req.body.completed;

			for (key in req.body) {
				// updating tasks
				if (key.startsWith('task')) {
					const taskId = Number.parseInt(key[4]);
					const taskIndex = remindersDb.tasks.findIndex((task) => task.id === taskId);
					if (req.body[key].length > 0) {
						if (key.includes('.completed')) {
							// update task completed state
							req.body[key] = req.body[key] === 'false' ? false : true;
							remindersDb.tasks[taskIndex].completed = req.body[key];
						} else if (key.includes('new')) {
							// add new task
							const newTask = {
								id: ++remindersDb.tasks.length,
								task: req.body[key],
								completed: false
							};

							remindersDb.tasks.push(newTask);
						} else {
							// update existing task name
							remindersDb.tasks[taskIndex].task = req.body[key];
						}
					} else {
						// remove empty tasks
						remindersDb.tasks.splice(taskIndex, 1);
						console.log('-empty', remindersDb.tasks);
					}
				}

				// updating tags
				if (key.startsWith('tag')) {
					const tagIndex = Number.parseInt(key[3]);
					const tagsDb = remindersDb.tags;
					console.log(tagIndex, tagsDb);
					if (req.body[key].length > 0) {
						if (key.includes('.new')) {
							// add new tag
							remindersDb.tags.push(req.body[key]);
							console.log('-new', remindersDb.tags);
						} else {
							// update existing tag name
							console.log('-updateb4', remindersDb.tags[tagIndex]);
							remindersDb.tags[tagIndex] = req.body[key];
							console.log('-update', remindersDb.tags);
						}		
					} else {
						// remove empty tasks
							remindersDb.tags.splice(tagIndex, 1);
							console.log('-empty', remindersDb.tags);
					}
				} // end if starts with tag
			} // end for loop

			res.render('reminder/single-reminder', { reminderItem: remindersDb });
		} // end if(req.body.title)
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
