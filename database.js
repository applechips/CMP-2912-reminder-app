let Database = {
	cindy: {
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
	alex: {
		reminders: []
	}
};

module.exports = Database;
