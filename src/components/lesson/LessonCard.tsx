import { useToast } from '@/hooks/use-toast'
import { CalendarDays } from 'lucide-react'
import type { Lesson } from '@/core/lessons/domain/Lesson'
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

const LessonCard = ({ lesson }: { lesson: Lesson }) => {
	const { toast } = useToast()

	const onDelete = async () => {
		const response = await fetch(`/api/lessons`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application.json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ lessonId: lesson.id }),
		})
		const data = await response.json()

		if (data.message === 'success') {
			toast({
				title: 'Lección eliminada',
				description: `La lección "${lesson.title}" ha sido eliminada`,
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
							(window.location.href = '/lessons/editor/' + lesson.id)
						}
					>
						<CardHeader>
							<CardTitle>{lesson.title}</CardTitle>
							<CardDescription className='line-clamp-3'>
								<div className='grid gap-1'>
									<span className='text-slate-700'>{lesson.caption}</span>
									<div className='flex items-center gap-1'>
										<CalendarDays className='h-4 w-4 mr-2' />
										<span>
											{new Intl.DateTimeFormat('es', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											}).formatRange(
												new Date(lesson.start),
												new Date(lesson.end),
											)}
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
							(window.location.href = '/lessons/editor/' + lesson.id)
						}
					>
						Editar
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
						¿Está seguro de eliminar la lección "{lesson.title}"?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción no se podrá deshacer. Todos los datos de esta lección
						serán eliminados permanentemente de la de base de datos.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
						onClick={onDelete}
					>
						Eliminar lección
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export { LessonCard }
