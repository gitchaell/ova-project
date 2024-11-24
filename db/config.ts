import { defineDb, defineTable, column } from 'astro:db'

const User = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		photoUrl: column.text({ optional: true }),
		names: column.text({ optional: false }),
		email: column.text({ optional: false, unique: true }),
		passwordHash: column.text({ optional: false }),
		school: column.text({ optional: true }),
		skills: column.text({ optional: true }),
	},
})

const Session = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		expiresAt: column.date({ optional: false }),
		userId: column.text({
			optional: false,
			references: () => User.columns.id,
		}),
	},
})

const Course = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		title: column.text({ optional: false }),
		level: column.text({ optional: false }),
		concepts: column.text({ optional: false }),
		start: column.date({ optional: false }),
		end: column.date({ optional: false }),
		schedules: column.text({ optional: true, default: '0 0-2 * * 1-5' }),
		userId: column.text({
			optional: false,
			references: () => User.columns.id,
		}),
	},
})

const Lesson = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		title: column.text({ optional: false }),
		caption: column.text({ optional: false }),
		start: column.date({ optional: false }),
		end: column.date({ optional: false }),
		done: column.boolean({ default: false }),
		//
		content: column.text({ optional: true }),
		image: column.text({ optional: true }),
		videoId: column.text({ optional: true }),
		video: column.text({ optional: true }),
		//
		courseId: column.text({
			optional: false,
			references: () => Course.columns.id,
		}),
	},
})

// https://astro.build/db/config
export default defineDb({
	tables: { User, Session, Course, Lesson },
})
