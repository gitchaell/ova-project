import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { User } from '@/core/users/domain/User'

const UserAvatar = ({ user }: { user: User }) => {
	return (
		<Avatar>
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
