import { defineDb, defineTable, column } from 'astro:db'

const User = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		names: column.text({ optional: false }),
		email: column.text({ optional: false, unique: true }),
		passwordHash: column.text({ optional: false }),
		attributes: column.json({ optional: true, defaultValue: {} }),
	},
})

const UserSession = defineTable({
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
	tables: { User, UserSession, Ova },
})
