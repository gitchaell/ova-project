import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Info } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import type { User } from '@/core/users/domain/User'
import type { Course } from '@/core/courses/domain/Course'
import { Skeleton } from '@/components/ui/skeleton'
import { CourseCard } from './CourseCard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const CourseList = ({ user }: { user: User }) => {
	const [loading, setLoading] = useState<boolean>(true)
	const [allCourses, setAllCourses] = useState<Course[]>([])
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
			setAllCourses(data.courses)
			setInProgressCourses(
				data.courses.filter(
					(course: Course) =>
						new Date(course.start) <= new Date() &&
						new Date() <= new Date(course.end),
				),
			)
			setUpcomingCourses(
				data.courses.filter(
					(course: Course) => new Date() < new Date(course.start),
				),
			)
			setPastCourses(
				data.courses.filter(
					(course: Course) => new Date(course.end) < new Date(),
				),
			)
		} else {
			toast({
				title: 'Error',
				description: 'No se pudieron cargar los cursos.',
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

	const getContent = (filter: 'inprogress' | 'upcoming' | 'past') => {
		const courses = {
			inprogress: inProgressCourses,
			upcoming: upcomingCourses,
			past: pastCourses,
		}[filter]

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
				: courses.length > 0 ?
					courses.map((course) => (
						<CourseCard key={course.id} course={course} />
					))
				:	<div className='grid place-content-center gap-4 py-8'>
						<p className='text-gray-600'>Cursos no encontrados</p>
						<Button
							variant='outline'
							onClick={() => (window.location.href = '/courses/editor')}
						>
							Crear curso
						</Button>
					</div>
				}
			</>
		)
	}

	return (
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

			<Tabs defaultValue='inprogress'>
				<TabsList>
					<TabsTrigger value='inprogress'>
						En Progreso ({inProgressCourses.length})
					</TabsTrigger>
					<TabsTrigger value='upcoming'>
						Próximos ({upcomingCourses.length})
					</TabsTrigger>
					<TabsTrigger value='past'>Pasados ({pastCourses.length})</TabsTrigger>
				</TabsList>

				<TabsContent value='inprogress'>{getContent('inprogress')}</TabsContent>
				<TabsContent value='upcoming'>{getContent('upcoming')}</TabsContent>
				<TabsContent value='past'>{getContent('past')}</TabsContent>
			</Tabs>
		</div>
	)
}

export { CourseList }
