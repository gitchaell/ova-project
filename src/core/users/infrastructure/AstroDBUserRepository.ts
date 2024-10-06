import { User as UserTable, db, eq } from 'astro:db'
import { type User } from '@/core/users/domain/User.ts'
import { type UserRepository } from '@/core/users/domain/UserRepository.ts'

export function createAstroDBUserRepository(): UserRepository {
	return {
		save,
		get,
		getAll,
	}
}

async function save(user: User): Promise<void> {
	await db
		.insert(UserTable)
		.values({
			id: user.id,
			names: user.names,
			email: user.email,
			passwordHash: user.passwordHash,
		})
		.execute()
}

async function get({ id, email }: Partial<User>): Promise<User | null> {
	let users: User[] = []

	const query = db.select().from(UserTable)

	if (id) {
		users = await query.where(eq(UserTable.id, id)).execute()
	}

	if (email) {
		users = await query.where(eq(UserTable.email, email)).execute()
	}

	return users?.[0] || null
}

async function getAll(): Promise<User[]> {
	const users = await db.select().from(UserTable).execute()
	return users
}
