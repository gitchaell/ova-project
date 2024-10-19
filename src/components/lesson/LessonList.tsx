import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { CalendarIcon, Info, LoaderCircle, Sparkles } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import type { Lesson } from '@/core/lessons/domain/Lesson'
import { Skeleton } from '@/components/ui/skeleton'
import { LessonCard } from './LessonCard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Course } from '@/core/courses/domain/Course'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import type { User } from '@/core/users/domain/User'
import { Badge } from '../ui/badge'
import { LessonListNotFound } from './LessonListNotFound'
import { LessonCardSkeleton } from './LessonCardSkeleton'

interface LessonGroup {
	key: string
	year: number
	week: number
	lessons: Lesson[]
}

const LessonList = ({ course, user }: { course: Course; user: User }) => {
	const [loading, setLoading] = useState<boolean>(true)

	const [allLessonsCount, setAllLessonsCount] = useState<number>(0)
	const [doneLessonsCount, setDoneLessonsCount] = useState<number>(0)
	const [undoneLessonsCount, setUndoneLessonsCount] = useState<number>(0)

	const [allLessons, setAllLessons] = useState<LessonGroup[]>([])
	const [undoneLessons, setUndoneLessons] = useState<LessonGroup[]>([])
	const [doneLessons, setDoneLessons] = useState<LessonGroup[]>([])

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
			setAllLessonsCount(data.count.all)
			setDoneLessonsCount(data.count.done)
			setUndoneLessonsCount(data.count.undone)

			setAllLessons(data.lessons.all)
			setUndoneLessons(data.lessons.undone)
			setDoneLessons(data.lessons.done)
		} else {
			toast({
				title: 'Error',
				description: 'No se pudieron cargar las lecciones.',
				variant: 'destructive',
			})
		}

		setLoading(false)
	}

	useEffect(() => {
		if (course.id) {
			fetchLessons(course.id)
		}
	}, [course.id])

	const getContent = (filter: 'ALL' | 'DONE' | 'UNDONE') => {
		const groups = {
			ALL: allLessons,
			DONE: doneLessons,
			UNDONE: undoneLessons,
		}[filter]

		return (
			<>
				{loading ?
					[1, 2, 3].map((index) => <LessonCardSkeleton key={index} />)
				: groups.length > 0 ?
					<Accordion
						type='multiple'
						className='w-full'
						defaultValue={groups.map((group) => group.key)}
					>
						{groups.map((group) => (
							<AccordionItem key={group.key} value={group.key}>
								<AccordionTrigger>
									<div className='grid grid-flow-col gap-2 items-center'>
										<CalendarIcon className='h-4 w-4' />
										Semana {group.week}, {group.year}
									</div>
								</AccordionTrigger>
								<AccordionContent>
									{
										<div className='grid grid-flow-row auto-rows-min gap-2'>
											{group.lessons.map((lesson) => (
												<LessonCard key={lesson.id} lesson={lesson} />
											))}
										</div>
									}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				:	<LessonListNotFound
						course={course}
						user={user}
						enableAI={filter === 'ALL'}
					/>
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

			<Tabs defaultValue='ALL'>
				<TabsList>
					<TabsTrigger value='ALL'>
						Todos
						<Badge variant='outline' className='ml-1'>
							{allLessonsCount}
						</Badge>
					</TabsTrigger>

					<TabsTrigger value='UNDONE'>
						Pendientes
						<Badge variant='outline' className='ml-1'>
							{undoneLessonsCount}
						</Badge>
					</TabsTrigger>

					<TabsTrigger value='DONE'>
						Finalizados
						<Badge variant='outline' className='ml-1'>
							{doneLessonsCount}
						</Badge>
					</TabsTrigger>
				</TabsList>

				<TabsContent value='ALL'>{getContent('ALL')}</TabsContent>
				<TabsContent value='UNDONE'>{getContent('UNDONE')}</TabsContent>
				<TabsContent value='DONE'>{getContent('DONE')}</TabsContent>
			</Tabs>
		</div>
	)
}

export { LessonList }
