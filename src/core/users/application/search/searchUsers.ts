import { type UserRepository } from '@/core/users/domain/UserRepository.ts'
import type { User } from '@/core/users/domain/User'

export async function searchUsers(
	userRepository: UserRepository,
	criteria: Partial<User>,
): Promise<User[]> {
	return await userRepository.search(criteria)
}
