import { navigate } from 'astro:transitions/client'
import { useToast } from '@/hooks/use-toast'
import {
	CalendarDays,
	EllipsisVertical,
	Eye,
	Settings,
	Trash,
} from 'lucide-react'
import type { Lesson } from '@/core/lessons/domain/Lesson'
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { lessonDateFormatter } from '@/core/lessons/domain/LessonDate'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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
			<DropdownMenu>
				<Card
					className='cursor-pointer hover:bg-slate-50'
					onClick={() => navigate('/lessons/editor/' + lesson.id)}
				>
					<CardHeader>
						<div className='grid grid-cols-[1fr_min-content] gap-2'>
							<CardTitle>{lesson.title}</CardTitle>
							<DropdownMenuTrigger asChild>
								<Button type='button' size='icon' variant='outline'>
									<EllipsisVertical />
								</Button>
							</DropdownMenuTrigger>
						</div>

						<CardDescription className='text-slate-700 line-clamp-2'>
							{lesson.caption}
						</CardDescription>

						<div className='grid grid-cols-[1fr_min-content] items-center gap-2 '>
							<div className='grid grid-cols-[min-content_1fr_min-content] items-center gap-2 text-sm text-gray-500'>
								<CalendarDays className='w-4 h-4' />
								<span>
									{lessonDateFormatter.formatRange(
										new Date(lesson.start),
										new Date(lesson.end),
									)}
								</span>
							</div>

							{lesson.done ?
								<Badge className='bg-green-100 border-green-500 text-green-600 hover:bg-green-200 w-fit'>
									Finalizado
								</Badge>
							:	<Badge variant='outline' className='w-fit'>
									Pendiente
								</Badge>
							}
						</div>
					</CardHeader>
				</Card>

				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>Opciones</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DropdownMenuGroup>
						<DropdownMenuItem
							onSelect={() => navigate('/lessons/editor/' + lesson.id)}
						>
							<Settings />
							<span>Editar</span>
						</DropdownMenuItem>

						<DropdownMenuItem
							onSelect={() => navigate('/lessons/preview/' + lesson.id)}
						>
							<Eye />
							<span>Previsualizar</span>
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
