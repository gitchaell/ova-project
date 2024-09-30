import { type User, ensureUserIsValid } from '@/core/users/domain/User.ts'
import { type UserRepository } from '@/core/users/domain/UserRepository.ts'

export async function signupUser(
	userRepository: UserRepository,
	user: User,
): Promise<void> {
	ensureUserIsValid(user)

	await userRepository.save(user)
}
