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

const Ova = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		title: column.text({ optional: false }),
		userId: column.text({
			optional: false,
			references: () => User.columns.id,
		}),
	},
})

// https://astro.build/db/config
export default defineDb({
	tables: { User, Session, Ova },
})
