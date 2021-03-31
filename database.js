let Database = [
	{
		id: 1,
		username: 'morty',
		name: 'Morty Wong',
		email: 'morty@dog.com',
		password: '123123',
		image: 'https://images.dog.ceo/breeds/poodle-toy/n02113624_265.jpg',
		reminders: [
			{
				id: 1,
				title: 'Monday',
				description: 'tasks for monday',
				date: '2021-03-31T20:00',
				formattedDate: 'Wed Mar 31 2021',
				formattedTime: '8:00 pm',
				completed: false,
				tasks: [
					{ id: 1, task: 'walk the dogs', completed: true },
					{ id: 2, task: 'go to school', completed: false }
				],
				tags: [ 'dogs', 'school' ]
			},
			{
				id: 2,
				title: 'Tuesday',
				description: 'tasks for tuesday',
				date: '2021-04-02T10:30',
				formattedDate: 'Fri Apr 02 2021',
				formattedTime: '10:30 am',
				completed: false,
				tasks: [
					{ id: 1, task: 'message prof', completed: false },
					{ id: 2, task: 'finish homework', completed: false }
				],
				tags: [ 'school' ]
			}
		],
		friends: [
			{ id: 2, name: 'Wonton Wong', image: 'https://images.dog.ceo/breeds/frise-bichon/6.jpg' },
			{ id: 3, name: 'Topy Marcinek', image: 'https://images.dog.ceo/breeds/terrier-bedlington/n02093647_79.jpg' }
		]
	},
	{
		id: 2,
		username: 'wonton',
		name: 'Wonton Wong',
		email: 'wonton@dog.com',
		password: '123123',
		image: 'https://images.dog.ceo/breeds/frise-bichon/6.jpg',
		reminders: [
			{
				id: 1,
				title: 'Wonton',
				description: 'tasks for wonton',
				date: '2021-04-03T07:30',
				formattedDate: 'Sat Apr 03 2021',
				formattedTime: '7:30am',
				completed: false,
				tasks: [
					{ id: 1, task: 'walk the dogs', completed: false },
					{ id: 2, task: 'go to school', completed: true }
				],
				tags: [ 'dogs', 'school' ]
			},
			{
				id: 2,
				title: 'Morty',
				description: 'tasks for morty',
				date: '2021-04-05T11:30',
				formattedDate: 'Mon Apr 05 2021',
				formattedTime: '11:30 am',
				completed: false,
				tasks: [
					{ id: 1, task: 'wonton task', completed: false },
					{ id: 2, task: 'go to school', completed: false }
				],
				tags: [ 'dogs', 'family' ]
			}
		]
	},
	{
		id: 3,
		username: 'topy',
		name: 'Topy Marcinek',
		email: 'topy@dog.com',
		password: '123123',
		image: 'https://images.dog.ceo/breeds/terrier-bedlington/n02093647_79.jpg',
		reminders: [
			{
				id: 1,
				title: 'Topy',
				description: 'tasks for topy',
				date: '2021-04-01T14:00',
				formattedDate: 'Thu Apr 01 2021',
				formattedTime: '2:00 pm',
				completed: false,
				tasks: [
					{ id: 1, task: 'walk the dogs', completed: true },
					{ id: 2, task: 'go to school', completed: false }
				],
				tags: [ 'dogs', 'school' ]
			}
		]
	},
	{
		id: 4,
		username: 'baesee',
		name: 'Baesee Donavan',
		email: 'baesee@dog.com',
		password: '123123',
		image: 'https://images.dog.ceo/breeds/mexicanhairless/n02113978_2306.jpg',
		reminders: [
			{
				id: 1,
				title: 'Baesee',
				description: 'tasks for Baesee',
				date: '2021-04-07T016:00',
				formattedDate: 'Thu Apr 01 2021',
				formattedTime: '5:00 pm',
				completed: false,
				tasks: [
					{ id: 1, task: 'walk the dogs', completed: false },
					{ id: 2, task: 'go to school', completed: false }
				],
				tags: [ 'dogs', 'school' ]
			}
		]
	}
];

const userModel = {
	findOne: (email) => {
		const user = Database.find((user) => user.email === email);
		if (user) {
			return user;
		}
		throw new Error(`Couldn't find user with email: ${email}`);
	},
	findById: (id) => {
		const user = Database.find((user) => user.id === id);
		if (user) {
			return user;
		}
		throw new Error(`Couldn't find user with id: ${id}`);
	},
	addUser: (profile) => {
		const hasUser = Database.find((user) => user.id === profile.id);

		if (!hasUser) {
			console.log('create');
			const newUser = {
				id: profile.id,
				name: profile.displayName
			};
			Database.push(newUser);
		}
	}
};

module.exports = { Database, userModel };
