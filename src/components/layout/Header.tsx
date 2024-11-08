import { navigate } from 'astro:transitions/client'
import type { User } from '@/core/users/domain/User'
import { UserAvatar } from '@/components/user/UserAvatar'
import { Button } from '@/components/ui/button'
import { House } from 'lucide-react'

const Header = ({ title, user }: { title: string; user: User }) => {
	const handleOpenMenu = () => {
		document.dispatchEvent(new CustomEvent('openMenuEvent'))
	}

	return (
		<div className='grid grid-cols-[min-content_1fr_min-content] gap-4 p-4'>
			<Button type='button' size='icon' onClick={() => navigate('/')}>
				<House className='w-12 h-12' />
			</Button>

			<Button
				type='button'
				variant='secondary'
				className='line-clamp-1'
				onClick={handleOpenMenu}
			>
				{title}
			</Button>

			<UserAvatar user={user} />
		</div>
	)
}

export { Header }
