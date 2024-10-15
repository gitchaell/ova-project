import { ActionError, defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { User } from '@/core/users/domain/User'
import { userService } from '@/services/UserService'

export const user = {
	find: defineAction({
		input: z.object({
			id: z.string().uuid(),
		}),
		handler: async ({ id }): Promise<User | null> => {
			let user: User | null = null

			try {
				user = await userService.findUser({ id })
			} catch (error) {
				if (error instanceof Error) {
					throw new ActionError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						stack: error.stack,
					})
				}
			}

			return user
		},
	}),
}
