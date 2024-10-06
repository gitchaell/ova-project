import { type User } from './User.ts'

export interface UserRepository {
	save: (user: User) => Promise<void>
	get: (query: Partial<User>) => Promise<User | null>
	getAll: () => Promise<User[]>
}
