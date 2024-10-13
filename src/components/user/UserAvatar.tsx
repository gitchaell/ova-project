import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { User } from '@/core/users/domain/User'

const UserAvatar = ({ user }: { user: User }) => {
	return (
		<Avatar
			className='cursor-pointer ring-gray-300 hover:ring-4'
			onClick={() => (window.location.href = '/profile')}
		>
			<img
				src={user.photoUrl || '/avatar.webp'}
				alt={'User image of ' + user.names}
				style={{ aspectRatio: '1/1', objectFit: 'cover' }}
			/>
			<AvatarFallback>
				{user.names.split(' ').map((name) => name[0].toUpperCase())}
			</AvatarFallback>
		</Avatar>
	)
}

export { UserAvatar }
