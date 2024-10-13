import { type User, ensureUserIsValid } from '@/core/users/domain/User.ts'
import { type UserRepository } from '@/core/users/domain/UserRepository.ts'
import { UserAlreadyExistsException } from '../../domain/UserAlreadyExistsException'

export async function signupUser(
	userRepository: UserRepository,
	user: User,
): Promise<void> {
	ensureUserIsValid(user)

	const exists = await userRepository.get({
		email: user.email,
	})

	if (exists) {
		throw new UserAlreadyExistsException()
	}

	await userRepository.save(user)
}
