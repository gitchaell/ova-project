import {
	Lucia,
	type Adapter,
	type DatabaseSession,
	type DatabaseUser,
} from 'lucia'
import { db, UserSession, User, lt, eq } from 'astro:db'
import type { User as UserInterface } from '@/interfaces/User'

const adapter: Adapter = {
	async deleteExpiredSessions(): Promise<void> {
		await db
			.delete(UserSession)
			.where(lt(UserSession.expiresAt, new Date()))
			.execute()
	},

	async deleteSession(sessionId: string): Promise<void> {
		await db.delete(UserSession).where(eq(UserSession.id, sessionId)).execute()
	},

	async deleteUserSessions(userId: string): Promise<void> {
		await db.delete(UserSession).where(eq(UserSession.userId, userId)).execute()
	},

	async getSessionAndUser(
		sessionId: string,
	): Promise<[DatabaseSession, DatabaseUser]> {
		const sessions = await db
			.select()
			.from(UserSession)
			.where(eq(UserSession.id, sessionId))
			.execute()
		if (!sessions?.[0]) return [{} as DatabaseSession, {} as DatabaseUser]

		const users = await db
			.select()
			.from(User)
			.where(eq(User.id, sessions[0].userId))
			.execute()
		if (!users) return [{} as DatabaseSession, {} as DatabaseUser]

		return [sessions[0] as DatabaseSession, users[0] as DatabaseUser]
	},

	async getUserSessions(userId: string): Promise<DatabaseSession[]> {
		const sessions = await db
			.select()
			.from(UserSession)
			.where(eq(UserSession.id, userId))
			.execute()
		return sessions as DatabaseSession[]
	},

	async setSession(session: DatabaseSession): Promise<void> {
		await db.insert(UserSession).values(session).execute()
	},

	async updateSessionExpiration(sessionId: string, expiresAt: Date) {
		await db
			.update(UserSession)
			.set({ expiresAt })
			.where(eq(UserSession.id, sessionId))
			.execute()
	},
}

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: import.meta.env.PROD,
		},
	},
	getUserAttributes: (attributes) => {
		return {
			names: attributes.names,
			email: attributes.email,
		}
	},
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: Omit<UserInterface, 'id'>
	}
}
