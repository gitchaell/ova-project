import { navigate } from 'astro:transitions/client'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Course } from '@/core/courses/domain/Course'

const LessonNewButton = ({ course }: { course: Course }) => {
	return (
		<Button
			variant='default'
			className='fixed bottom-4 right-4'
			onClick={() => navigate(`/lessons/${course.id}/editor`)}
		>
			<Plus className='w-4 h-4' />
			Nueva lección
		</Button>
	)
}

export { LessonNewButton }
