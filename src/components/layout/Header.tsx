import type { User } from '@/core/users/domain/User'
import { UserAvatar } from '../user/UserAvatar'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'

const Header = ({ title, user }: { title: string; user: User }) => {
	const handleOpenMenu = () => {
		document.dispatchEvent(new CustomEvent('openMenuEvent'))
	}

	return (
		<div className='grid grid-cols-[min-content_1fr_min-content] gap-4 p-4'>
			<UserAvatar user={user} />

			<Button type='button' variant='secondary' onClick={handleOpenMenu}>
				{title}
			</Button>

			<Button type='button' size='icon' onClick={handleOpenMenu}>
				<Search className='h-4 w-4' />
			</Button>

			{/* <form method='POST' action='/api/users/logout'>
				<Button type='submit'>Logout</Button>
			</form> */}
		</div>
	)
}

export { Header }
