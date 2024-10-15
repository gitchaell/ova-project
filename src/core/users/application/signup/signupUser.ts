import { type User, ensureUserIsValid } from '@/core/users/domain/User.ts'
import { type UserRepository } from '@/core/users/domain/UserRepository.ts'
import { UserAlreadyExistsException } from '@/core/users/domain/UserAlreadyExistsException'

export async function signupUser(
	userRepository: UserRepository,
	user: User,
): Promise<void> {
	ensureUserIsValid(user)

	const usersMatching = await userRepository.search({
		email: user.email,
	})

	if (usersMatching?.length > 0) {
		throw new UserAlreadyExistsException()
	}

	await userRepository.save(user)
}
