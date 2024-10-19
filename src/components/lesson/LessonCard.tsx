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
import { lessonDateFormatter } from '@/core/lessons/domain/LessonDate'
import { Badge } from '../ui/badge'

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
							<CardDescription>
								<div className='grid gap-1'>
									<span className='text-slate-700 line-clamp-2'>
										{lesson.caption}
									</span>
									<div className='grid grid-cols-[min-content_1fr_min-content] items-center gap-2'>
										<CalendarDays className='w-4 h-4' />
										<span>
											{lessonDateFormatter.formatRange(
												new Date(lesson.start),
												new Date(lesson.end),
											)}
										</span>
										{lesson.done ?
											<Badge className='bg-green-100 border-green-500 text-green-600 hover:bg-green-200'>
												Finalizado
											</Badge>
										:	<Badge variant='outline'>Pendiente</Badge>}
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
