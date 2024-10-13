import { User as UserTable, Session as SessionTable, db, eq } from 'astro:db'
import { type User } from '@/core/users/domain/User.ts'
import { type UserRepository } from '@/core/users/domain/UserRepository.ts'
import { UserNotFoundException } from '../domain/UserNotFoundException'

export function createAstroDBUserRepository(): UserRepository {
	return {
		save,
		get,
		getAll,
		remove,
	}
}

async function save(user: User): Promise<void> {
	const exists = await get({ id: user.id })

	if (exists) {
		await db
			.update(UserTable)
			.set({ names: user.names, school: user.school, skills: user.skills })
			.where(eq(UserTable.id, user.id))
			.execute()
	} else {
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
}

async function get({ id, names, email }: Partial<User>): Promise<User | null> {
	let users: User[] = []

	const query = db.select().from(UserTable)

	if (id) {
		users = await query.where(eq(UserTable.id, id)).execute()
	}
	if (names) {
		users = await query.where(eq(UserTable.names, names)).execute()
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

async function remove(id: string): Promise<void> {
	await db.delete(SessionTable).where(eq(SessionTable.userId, id)).execute()
	await db.delete(UserTable).where(eq(UserTable.id, id)).execute()
}
