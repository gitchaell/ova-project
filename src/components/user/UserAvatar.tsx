import { navigate } from 'astro:transitions/client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { User } from '@/core/users/domain/User'

const UserAvatar = ({ user }: { user: User }) => {
	return (
		<Avatar
			className='cursor-pointer ring-gray-300 hover:ring-4'
			onClick={() => navigate('/profile')}
		>
			<img
				src={user.photoUrl || '/avatar.webp'}
				alt={user.names}
				style={{ aspectRatio: '1/1', objectFit: 'cover' }}
				loading='lazy'
			/>
			<AvatarFallback>
				{user.names.split(' ').map((name) => name[0].toUpperCase())}
			</AvatarFallback>
		</Avatar>
	)
}

export { UserAvatar }
