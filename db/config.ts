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
		schedules: column.text({ optional: false }),
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
		start: column.text({ optional: false }),
		end: column.text({ optional: false }),
		done: column.boolean({ default: false }),
		//
		intro: column.text({ optional: true }),
		before: column.text({ optional: true }),
		during: column.text({ optional: true }),
		after: column.text({ optional: true }),
		quiz: column.text({ optional: true }),
		urls: column.json({ optional: true }),
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
