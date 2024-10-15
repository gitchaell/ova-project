import { db, User, Course } from 'astro:db'

// password: '12345678'

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(User).values([
		{
			id: '8b7d3fbe-b34a-4079-bdc3-d89efe334b1c',
			photoUrl:
				'https://m.media-amazon.com/images/I/41+jrimaRpL._UXNaN_FMjpg_QL85_.jpg',
			names: 'Michaell Alavedra',
			email: 'michaell.alavedra@ovaia.com',
			passwordHash:
				'$argon2id$v=19$m=19456,t=2,p=1$xikzHoEOuxEJ9VvQpHGtWg$fyGKT+foZ1j/ilrp+5EZpSL65nvayw/nvp1LBxtizT8',
			school: 'Tengo mi propia plataforma online en donde imparto mis cursos',
			skills:
				'Principalmente me dedico a enseñar temas de programación y desarrollo de software',
		},
	])
	await db.insert(Course).values([
		{
			id: 'f7f6f7e7-8f7f-4f6f-9f6f-7f6f6f6f6f6f',
			title: 'Programación web con el framework Astro',
			concepts: 'Componentes Web, Enrutamiento, End-points, Actions, AstroDB',
			level: 'Programadores con conocimiento de nivel intermedio y avanzado',
			start: new Date(2024, 8, 15),
			end: new Date(2024, 11, 15),
			userId: '8b7d3fbe-b34a-4079-bdc3-d89efe334b1c',
		},
	])
}
