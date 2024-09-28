import { db, User, Ova } from 'astro:db'

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(User).values([
		{ id: 1, names: 'Admin' },
		{ id: 2, names: 'Jhon Doe' },
	])

	await db.insert(Ova).values([
		{ id: 1, title: 'Espero que te guste Astro DB!', userId: 1 },
		{ id: 2, title: 'Disfruta!', userId: 2 },
	])
}
