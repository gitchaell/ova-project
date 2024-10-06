import { type UserRepository } from '@/core/users/domain/UserRepository.ts'
import type { User } from '@/core/users/domain/User'

export async function getUser(
	userRepository: UserRepository,
	query: Partial<User>,
): Promise<User | null> {
	return await userRepository.get(query)
}
