import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { CalendarIcon, Info, LoaderCircle, Sparkles } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import type { Lesson } from '@/core/lessons/domain/Lesson'
import { Skeleton } from '@/components/ui/skeleton'
import { LessonCard } from './LessonCard'
import { Button } from '@/components/ui/button'
import type { Course } from '@/core/courses/domain/Course'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import type { User } from '@/core/users/domain/User'

const LessonList = ({ course, user }: { course: Course; user: User }) => {
	const [loading, setLoading] = useState<boolean>(true)
	const [generating, setGenerating] = useState<boolean>(false)
	const [lessons, setAllLessons] = useState<Lesson[]>([])

	const { toast } = useToast()

	const fetchLessons = async (courseId: string) => {
		setLoading(true)

		const response = await fetch(`/api/lessons?courseId=${courseId}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()

		if (data.message === 'success') {
			setAllLessons(data.lessons)
		} else {
			toast({
				title: 'Error',
				description: 'No se pudieron cargar las lecciones.',
				variant: 'destructive',
			})
		}

		setLoading(false)
	}

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
			console.log(data)
			setAllLessons(data.lessons)
		} else {
			toast({
				title: 'Error',
				description: data.message,
				variant: 'destructive',
			})
		}

		setGenerating(false)
	}

	useEffect(() => {
		if (course.id) {
			fetchLessons(course.id)
		}
	}, [course.id])

	const getContent = () => {
		return (
			<>
				{loading ?
					Array.from({ length: 3 })
						.fill(null)
						.map((_, index) => (
							<div
								key={index}
								className='flex border border-gray-100 p-4 space-x-4 rounded-md'
							>
								<Skeleton className='h-12 w-12 rounded-full' />
								<div className='space-y-4'>
									<Skeleton className='h-8 w-[250px]' />
									<Skeleton className='h-4 w-[200px]' />
									<Skeleton className='h-3 w-[200px]' />
								</div>
							</div>
						))
				: lessons.length > 0 ?
					<Accordion
						type='multiple'
						className='w-full'
						defaultValue={['week-1']}
					>
						<AccordionItem value='week-1'>
							<AccordionTrigger>
								<div className='grid grid-flow-col gap-2 items-center'>
									<CalendarIcon className='h-4 w-4' />
									Semana 1
								</div>
							</AccordionTrigger>
							<AccordionContent>
								{
									<div className='grid grid-flow-row auto-rows-min gap-2'>
										{lessons.map((lesson) => (
											<LessonCard key={lesson.id} lesson={lesson} />
										))}
									</div>
								}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='week-2'>
							<AccordionTrigger>
								<div className='grid grid-flow-col gap-2 items-center'>
									<CalendarIcon className='h-4 w-4' />
									Semana 2
								</div>
							</AccordionTrigger>
							<AccordionContent>
								{
									<div className='grid grid-flow-row auto-rows-min gap-2'>
										{lessons.map((lesson) => (
											<LessonCard key={lesson.id} lesson={lesson} />
										))}
									</div>
								}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='week-3'>
							<AccordionTrigger>
								<div className='grid grid-flow-col gap-2 items-center'>
									<CalendarIcon className='h-4 w-4' />
									Semana 3
								</div>
							</AccordionTrigger>
							<AccordionContent>
								{
									<div className='grid grid-flow-row auto-rows-min gap-2'>
										{lessons.map((lesson) => (
											<LessonCard key={lesson.id} lesson={lesson} />
										))}
									</div>
								}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				:	<div className='grid place-content-center gap-4 py-10'>
						<p className='text-gray-600 text-center'>
							Lecciones no encontradas
						</p>
						{generating ?
							<Button disabled>
								<LoaderCircle className='h-4 w-4 mr-2' />
								Generando lecciones automáticamente
							</Button>
						:	<Button onClick={onGenerateLessons}>
								<Sparkles className='h-4 w-4 mr-2' />
								Generar lecciones automáticamente
							</Button>
						}
					</div>
				}
			</>
		)
	}

	return (
		<div className='grid gap-4 mt-4 pb-10'>
			<Alert className='bg-blue-50 border-blue-600'>
				<Info className='h-4 w-4' color='rgb(37 99 235)' />
				<AlertTitle className='text-blue-600'>
					<strong>Contenido del curso</strong>
				</AlertTitle>
				<AlertDescription className='text-blue-600'>
					A continuación se muestran las lecciones que componen el contenido de
					tu curso agrupado por semanas.
				</AlertDescription>
			</Alert>

			{getContent()}
		</div>
	)
}

export { LessonList }
