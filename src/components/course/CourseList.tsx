import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Info } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import type { User } from '@/core/users/domain/User'
import type { Course } from '@/core/courses/domain/Course'
import { CourseCard } from './CourseCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CourseCardSkeleton } from './CourseCardSkeleton'
import { CourseListNotFound } from './CourseListNotFound'
import { Badge } from '../ui/badge'
import { CourseNewButton } from './CourseNewButton'

const CourseList = ({ user }: { user: User }) => {
	const [loading, setLoading] = useState<boolean>(true)
	const [inProgressCourses, setInProgressCourses] = useState<Course[]>([])
	const [upcomingCourses, setUpcomingCourses] = useState<Course[]>([])
	const [pastCourses, setPastCourses] = useState<Course[]>([])

	const { toast } = useToast()

	const fetchCourses = async (userId: string) => {
		setLoading(true)

		const response = await fetch(`/api/courses?userId=${userId}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()

		if (data.message === 'success') {
			setInProgressCourses(data.courses.inProgress)
			setUpcomingCourses(data.courses.upcoming)
			setPastCourses(data.courses.past)
		} else {
			toast({
				title: 'Error',
				description: data.messages,
				variant: 'destructive',
			})
		}

		setLoading(false)
	}

	useEffect(() => {
		if (user.id) {
			fetchCourses(user.id)
		}
	}, [user.id])

	const getContent = (filter: 'IN_PROGRESS' | 'UPCOMING' | 'PAST') => {
		const courses = {
			IN_PROGRESS: inProgressCourses,
			UPCOMING: upcomingCourses,
			PAST: pastCourses,
		}[filter]

		return (
			<div className='grid grid-flow-row auto-rows-min gap-2'>
				{loading ?
					[1, 2, 3].map((key) => <CourseCardSkeleton key={key} />)
				: courses.length > 0 ?
					courses.map((course) => (
						<CourseCard key={course.id} course={course} />
					))
				:	<CourseListNotFound />}
			</div>
		)
	}

	return (
		<>
			<div className='grid gap-4 mt-4'>
				<Alert className='bg-blue-50 border-blue-600'>
					<Info className='h-4 w-4' color='rgb(37 99 235)' />
					<AlertTitle className='text-blue-600'>
						<strong>Bienvenid@ {user.names}</strong>
					</AlertTitle>
					<AlertDescription className='text-blue-600'>
						A continuación se muestran todos los cursos que impartes.
					</AlertDescription>
				</Alert>

				<Tabs defaultValue='IN_PROGRESS'>
					<TabsList>
						<TabsTrigger value='IN_PROGRESS'>
							En Progreso
							<Badge variant='outline' className='ml-1'>
								{inProgressCourses.length}
							</Badge>
						</TabsTrigger>
						<TabsTrigger value='UPCOMING'>
							Próximos
							<Badge variant='outline' className='ml-1'>
								{upcomingCourses.length}
							</Badge>
						</TabsTrigger>
						<TabsTrigger value='PAST'>
							Pasados
							<Badge variant='outline' className='ml-1'>
								{pastCourses.length}
							</Badge>
						</TabsTrigger>
					</TabsList>

					<TabsContent value='IN_PROGRESS'>
						{getContent('IN_PROGRESS')}
					</TabsContent>
					<TabsContent value='UPCOMING'>{getContent('UPCOMING')}</TabsContent>
					<TabsContent value='PAST'>{getContent('PAST')}</TabsContent>
				</Tabs>
			</div>

			<CourseNewButton />
		</>
	)
}

export { CourseList }
