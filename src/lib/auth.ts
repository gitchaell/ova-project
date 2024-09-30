import { Lucia, TimeSpan } from 'lucia'
import { db, Session as SessionTable, User as UserTable } from 'astro:db'
import { AstroDBAdapter } from 'lucia-adapter-astrodb'
import type { User } from '@/core/users/domain/User'

export const lucia = new Lucia(
	new AstroDBAdapter(db, SessionTable, UserTable),
	{
		sessionExpiresIn: new TimeSpan(7, 'w'),
		sessionCookie: {
			attributes: {
				sameSite: 'none',
				secure: true,
			},
		},
		getUserAttributes: (attributes) => {
			return {
				photoUrl: attributes.photoUrl,
				names: attributes.names,
				email: attributes.email,
			}
		},
	},
)

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: Omit<User, 'id'>
	}
}
