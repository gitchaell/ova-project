import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const MainButton = () => {
	return (
		<Button
			variant='default'
			size='icon'
			className='fixed bottom-4 right-4'
			onClick={() => (window.location.href = '/courses/editor')}
		>
			<Plus className='w-4 h-4' />
		</Button>
	)
}

export { MainButton }
