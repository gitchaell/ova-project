import { type User } from './User.ts'

export interface UserRepository {
	save: (user: User) => Promise<void>
	find: (criteria: Partial<User>) => Promise<User>
	search: (criteria: Partial<User>) => Promise<User[]>
	remove: (id: string) => Promise<void>
}
