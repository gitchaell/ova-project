import { type User } from './User.ts'

export interface UserRepository {
	save: (user: User) => Promise<void>
	get: (id: string) => Promise<User | null>
	getAll: () => Promise<User[]>
}
