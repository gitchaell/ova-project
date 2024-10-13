import { db, User, Ova } from 'astro:db'

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(User).values([
		{
			id: '8b7d3fbe-b34a-4079-bdc3-d89efe334b1c',
			photoUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWGZTXqSnfiSHoCSGhh8vT2mr04RKgSeoTw&s',
			names: 'System Admin',
			email: 'admin@ovaia.com',
			// password: '12345678'
			passwordHash:
				'$argon2id$v=19$m=19456,t=2,p=1$xikzHoEOuxEJ9VvQpHGtWg$fyGKT+foZ1j/ilrp+5EZpSL65nvayw/nvp1LBxtizT8',
		},
	])
	// await db.insert(Ova).values([
	// 	{ id: '1', title: 'Espero que te guste Astro DB!', userId: '1' },
	// 	{ id: '2', title: 'Disfruta!', userId: '2' },
	// ])
}
