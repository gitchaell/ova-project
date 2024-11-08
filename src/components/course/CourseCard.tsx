import { navigate } from 'astro:transitions/client'
import { useToast } from '@/hooks/use-toast'
import {
	Bookmark,
	CalendarDays,
	Clock,
	EllipsisVertical,
	Settings,
	Trash,
} from 'lucide-react'
import type { Course } from '@/core/courses/domain/Course'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	AlertDialog,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogCancel,
	AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { courseDateFormatter } from '@/core/courses/domain/CourseDate'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const CourseCard = ({ course }: { course: Course }) => {
	const { toast } = useToast()

	const onDelete = async () => {
		const response = await fetch(`/api/courses`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application.json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ courseId: course.id }),
		})
		const data = await response.json()

		if (data.message === 'success') {
			toast({
				title: 'Curso eliminado',
				description: `El curso "${course.title}" ha sido eliminado`,
			})
		} else {
			toast({
				title: 'Algo salió mal!',
				description: data.message,
				variant: 'destructive',
			})
		}
	}

	return (
		<AlertDialog>
			<DropdownMenu>
				<Card
					className='cursor-pointer hover:bg-slate-50'
					onClick={() => navigate('/courses/details/' + course.id)}
				>
					<CardHeader>
						<div className='grid grid-cols-[1fr_min-content] gap-2'>
							<CardTitle>{course.title}</CardTitle>
							<DropdownMenuTrigger asChild>
								<Button type='button' size='icon' variant='outline'>
									<EllipsisVertical />
								</Button>
							</DropdownMenuTrigger>
						</div>

						<CardDescription className='text-slate-700 line-clamp-2'>
							{course.concepts}
						</CardDescription>

						<div className='grid grid-cols-[min-content_1fr] items-center gap-2 text-sm text-gray-500'>
							<CalendarDays className='w-4 h-4' />
							<span>
								{courseDateFormatter.formatRange(
									new Date(course.start),
									new Date(course.end),
								)}
							</span>
						</div>

						<div className='grid grid-cols-[min-content_1fr] items-center gap-2 text-sm text-gray-500'>
							<Clock className='w-4 h-4' />
							<span> {course.schedules}</span>
						</div>
					</CardHeader>
				</Card>

				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>Opciones</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DropdownMenuGroup>
						<DropdownMenuItem
							onSelect={() => navigate('/courses/editor/' + course.id)}
						>
							<Settings />
							<span>Editar</span>
						</DropdownMenuItem>

						<DropdownMenuItem
							onSelect={() => navigate('/courses/details/' + course.id)}
						>
							<Bookmark />
							<span>Ver lecciones</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>

					<DropdownMenuSeparator />

					<AlertDialogTrigger asChild>
						<DropdownMenuItem className='text-red-500'>
							<Trash />
							<span>Eliminar</span>
						</DropdownMenuItem>
					</AlertDialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						¿Está seguro de eliminar el curso "{course.title}"?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción no se podrá deshacer. Todos los datos de este curso
						serán eliminados permanentemente de la de base de datos.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
						onClick={onDelete}
					>
						Eliminar curso
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export { CourseCard }
