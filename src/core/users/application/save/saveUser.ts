import { type UserRepository } from '@/core/users/domain/UserRepository.ts'
import type { User } from '@/core/users/domain/User'

export async function saveUser(
	userRepository: UserRepository,
	user: User,
): Promise<void> {
	return await userRepository.save(user)
}
