import { useToast } from '@/hooks/use-toast'
import { CalendarDays } from 'lucide-react'
import type { Course } from '@/core/courses/domain/Course'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'
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
} from '../ui/alert-dialog'

const CourseCard = ({ course }: { course: Course }) => {
	const { toast } = useToast()

	const onDeleteCourse = async () => {
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
			<ContextMenu>
				<ContextMenuTrigger>
					<Card
						className='cursor-pointer hover:bg-slate-50'
						onClick={() =>
							(window.location.href = '/courses/details/' + course.id)
						}
					>
						<CardHeader>
							<CardTitle>{course.title}</CardTitle>
							<CardDescription className='line-clamp-3'>
								<div className='grid gap-1'>
									<span className='text-slate-700'>{course.concepts}</span>
									<div className='flex items-center gap-1'>
										<CalendarDays className='h-4 w-4 mr-2' />
										<span>
											{new Intl.DateTimeFormat('en', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											}).formatRange(
												new Date(course.start),
												new Date(course.end),
											)}
											, {course.schedules}
										</span>
									</div>
								</div>
							</CardDescription>
						</CardHeader>
					</Card>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem
						onSelect={() =>
							(window.location.href = '/courses/editor/' + course.id)
						}
					>
						Editar
					</ContextMenuItem>

					<ContextMenuItem
						onSelect={() =>
							(window.location.href = '/courses/details/' + course.id)
						}
					>
						Lecciones
					</ContextMenuItem>

					<ContextMenuSeparator />

					<ContextMenuItem className='text-red-500'>
						<AlertDialogTrigger>Eliminar</AlertDialogTrigger>
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>

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
						onClick={onDeleteCourse}
					>
						Eliminar curso
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export { CourseCard }
