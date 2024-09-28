import { defineDb, defineTable, column } from 'astro:db'

const User = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		names: column.text(),
	},
})

const Ova = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		title: column.text(),
		userId: column.number({ references: () => User.columns.id }),
	},
})

// https://astro.build/db/config
export default defineDb({
	tables: { User, Ova },
})
