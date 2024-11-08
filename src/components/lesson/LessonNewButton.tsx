import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LessonNewButton = () => {
	return (
		<Button
			variant='default'
			className='fixed bottom-4 right-4'
			onClick={() => (window.location.href = '/lessons/editor')}
		>
			<Plus className='w-4 h-4' />
			Nueva lección
		</Button>
	)
}

export { LessonNewButton }
