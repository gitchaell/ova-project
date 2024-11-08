import { navigate } from 'astro:transitions/client'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LessonNewButton = () => {
	return (
		<Button
			variant='default'
			className='fixed bottom-4 right-4'
			onClick={() => navigate('/lessons/editor')}
		>
			<Plus className='w-4 h-4' />
			Nueva lección
		</Button>
	)
}

export { LessonNewButton }
