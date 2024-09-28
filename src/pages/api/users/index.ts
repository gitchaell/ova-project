import type { APIRoute } from 'astro'
import { User, db } from 'astro:db'

export const GET: APIRoute = async ({ params, request }) => {
	const users = await db.select().from(User)

	return new Response(JSON.stringify({ users }))
}

export const POST: APIRoute = async ({ request }) => {
	const user = await request.json()
	await db.insert(User).values(user)

	return new Response(
		JSON.stringify({
			message: 'User created!',
		}),
	)
}

export const PUT: APIRoute = ({ request }) => {
	return new Response(
		JSON.stringify({
			message: 'This was a PUT!',
		}),
	)
}

export const DELETE: APIRoute = ({ request }) => {
	return new Response(
		JSON.stringify({
			message: 'This was a DELETE!',
		}),
	)
}
