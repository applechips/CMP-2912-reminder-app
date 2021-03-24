let Database = [
  {
    id: 1,
    username: 'morty',
    name: 'Morty Wong',
    email: 'morty@dog.com',
    password: '123123',
    reminders: [
      {
        id: 1,
        title: 'Monday',
        description: 'tasks for monday',
        completed: false,
        tasks: [ 'walk the dogs', 'go to school' ],
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
    ]
  },
  {
    id: 2,
    username: 'wonton',
    name: 'Wonton Wong',
    email: 'wonton@dog.com',
    password: '123123',
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
