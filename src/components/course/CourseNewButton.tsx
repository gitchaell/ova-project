import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CourseNewButton = () => {
	return (
		<Button
			variant='default'
			className='fixed bottom-4 right-4'
			onClick={() => (window.location.href = '/courses/editor')}
		>
			<Plus className='w-4 h-4' />
			Nuevo curso
		</Button>
	)
}

export { CourseNewButton }
