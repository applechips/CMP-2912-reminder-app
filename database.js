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
				completed: false,
				tasks: [ { task: 'walk the dogs', completed: false }, { task: 'go to school', completed: false } ],
				tags: [ 'dogs', 'school' ]
			},
			{
				id: 2,
				title: 'Tuesday',
				description: 'tasks for tuesday',
				completed: false,
				tasks: [ 'feed the dogs', 'finish chores' ],
				tags: [ 'dogs', 'family' ]
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
				completed: false,
				tasks: [ 'walk the dogs', 'go to school' ],
				tags: [ 'dogs', 'school' ]
			},
			{
				id: 2,
				title: 'Morty',
				description: 'tasks for morty',
				completed: false,
				tasks: [ 'feed the dogs', 'finish chores' ],
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
				completed: false,
				tasks: [ 'walk the dogs', 'go to school' ],
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
				completed: false,
				tasks: [ 'walk the dogs', 'go to school' ],
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
