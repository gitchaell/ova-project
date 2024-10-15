import { type UserRepository } from '@/core/users/domain/UserRepository.ts'
import type { User } from '@/core/users/domain/User'

export async function findUser(
	userRepository: UserRepository,
	criteria: Partial<User>,
): Promise<User> {
	return await userRepository.find(criteria)
}
