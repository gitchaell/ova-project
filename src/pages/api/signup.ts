import { lucia } from '../../lib/auth'
import { generateId } from 'lucia'
import { hash } from '@node-rs/argon2'

import type { APIContext } from 'astro'
import { db } from 'astro:db'
import { User } from 'astro:db'

export async function POST(context: APIContext): Promise<Response> {
	const formData = await context.request.formData()

	const names = formData.get('names')
	const email = formData.get('email')
	const password = formData.get('password')

	if (
		!names ||
		typeof names !== 'string' ||
		names.length < 3 ||
		names.length > 31
	) {
		return new Response(JSON.stringify({ error: 'Invalid names' }), {
			status: 400,
		})
	}

	if (
		!email ||
		typeof email !== 'string' ||
		email.length < 6 ||
		email.length > 255 ||
		!email.includes('@') ||
		!email.includes('.')
	) {
		return new Response(JSON.stringify({ error: 'Invalid email' }), {
			status: 400,
		})
	}

	if (
		!password ||
		typeof password !== 'string' ||
		password.length < 6 ||
		password.length > 255
	) {
		return new Response(JSON.stringify({ error: 'Invalid password' }), {
			status: 400,
		})
	}

	const passwordHash = await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	})
	const id = generateId(15)

	try {
		db.insert(User).values({ id, names, email, passwordHash }).execute()

		const session = await lucia.createSession(id, { names, email })
		const sessionCookie = lucia.createSessionCookie(session.id)
		context.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		)

		return new Response()
	} catch (e) {
		if (e instanceof Error) {
			return new Response(JSON.stringify({ error: e.message }), { status: 500 })
		}
		return new Response(
			JSON.stringify({ error: 'An unknown error occurred' }),
			{ status: 500 },
		)
	}
}
