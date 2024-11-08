import { navigate } from 'astro:transitions/client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const CourseListNotFound = () => {
	return (
		<div className='grid place-content-center gap-4 py-10'>
			<p className='text-gray-600'>Cursos no encontrados</p>
			<Button variant='default' onClick={() => navigate('/courses/editor')}>
				<Plus className='w-4 h-4 mr-2' />
				Crear curso
			</Button>
		</div>
	)
}

export { CourseListNotFound }
