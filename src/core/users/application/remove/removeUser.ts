import { type UserRepository } from '@/core/users/domain/UserRepository.ts'

export async function removeUser(
	userRepository: UserRepository,
	userId: string,
): Promise<void> {
	return await userRepository.remove(userId)
}
