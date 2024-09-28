import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Image } from 'astro:assets'

const UserAvatar = () => {
	return (
		<Avatar>
			<img src='/avatar.webp' alt='User Avatar' />
			<AvatarFallback>AM</AvatarFallback>
		</Avatar>
	)
}

export { UserAvatar }
