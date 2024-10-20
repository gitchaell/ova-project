import { Button } from '@/components/ui/button'
import type { Course } from '@/core/courses/domain/Course'
import type { User } from '@/core/users/domain/User'
import { useToast } from '@/hooks/use-toast'
import { LoaderCircle, Sparkles } from 'lucide-react'
import { useState } from 'react'

const LessonListNotFound = ({
	course,
	user,
	enableAI = false,
}: {
	course: Course
	user: User
	enableAI: boolean
}) => {
	const { toast } = useToast()
	const [generating, setGenerating] = useState<boolean>(false)

	const onGenerateLessons = async () => {
		setGenerating(true)

		const response = await fetch(`/api/lessons/generate/array`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ course, user }),
		})
		const data = await response.json()

		if (data.message === 'success') {
			window.location.reload()
		} else {
			toast({
				title: 'Error',
				description: data.message,
				variant: 'destructive',
			})
		}

		setGenerating(false)
	}

	return (
		<div className='grid place-content-center gap-4 py-10'>
			<p className='text-gray-600 text-center'>Lecciones no encontradas</p>
			{enableAI &&
				(generating ?
					<Button disabled>
						<LoaderCircle className='h-4 w-4 mr-2 animate-spin' />
						Generando lecciones automáticamente
					</Button>
				:	<Button onClick={onGenerateLessons}>
						<Sparkles className='h-4 w-4 mr-2' />
						Generar lecciones automáticamente
					</Button>)}
		</div>
	)
}

export { LessonListNotFound }
