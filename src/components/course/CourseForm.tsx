import { navigate } from 'astro:transitions/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { CalendarIcon, Info } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '../ui/alert'
import { Textarea } from '@/components/ui/textarea'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { Course } from '@/core/courses/domain/Course'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { courseDateFormatter } from '@/core/courses/domain/CourseDate'
import {
	COURSE_TITLE_MAX_LENGTH,
	COURSE_TITLE_MIN_LENGTH,
} from '@/core/courses/domain/CourseTitle'
import {
	COURSE_CONCEPTS_MAX_LENGTH,
	COURSE_CONCEPTS_MIN_LENGTH,
} from '@/core/courses/domain/CourseConcepts'
import {
	COURSE_LEVEL_MAX_LENGTH,
	COURSE_LEVEL_MIN_LENGTH,
} from '@/core/courses/domain/CourseLevel'
import { COURSE_SCHEDULES_MAX_LENGTH } from '@/core/courses/domain/CourseSchedule'

const formSchema = z
	.object({
		id: z.string().uuid(),
		title: z.string().min(COURSE_TITLE_MIN_LENGTH).max(COURSE_TITLE_MAX_LENGTH),
		concepts: z
			.string()
			.min(COURSE_CONCEPTS_MIN_LENGTH)
			.max(COURSE_CONCEPTS_MAX_LENGTH),
		level: z.string().min(COURSE_LEVEL_MIN_LENGTH).max(COURSE_LEVEL_MAX_LENGTH),
		start: z.date(),
		end: z.date(),
		schedules: z.string().max(COURSE_SCHEDULES_MAX_LENGTH).optional(),
		userId: z.string().uuid(),
	})
	.refine(
		(data) => {
			const minDuration = 6 * 24 * 60 * 60 * 1000 // 1 semana en milisegundos
			const maxDuration = 6 * 31 * 24 * 60 * 60 * 1000 // 6 meses en milisegundos
			const duration = data.end.getTime() - data.start.getTime()
			return duration >= minDuration && duration <= maxDuration
		},
		{
			message: 'El curso debe durar mínimo 1 semana y máximo 6 meses.',
			path: ['end'],
		},
	)

const CourseForm = ({
	course,
	mode,
}: {
	course: Course
	mode: 'CREATE' | 'UPDATE'
}) => {
	const { toast } = useToast()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: course.id,
			title: course.title || '',
			concepts: course.concepts || '',
			level: course.level || '',
			start: course.start ? new Date(course.start) : new Date(),
			end: course.end ? new Date(course.end) : undefined,
			schedules: course.schedules || '',
			userId: course.userId,
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const response = await fetch(`/api/courses`, {
			method: 'POST',
			headers: {
				'Accept': 'application.json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
		const data = await response.json()

		if (data.message === 'success') {
			toast({
				title: 'Curso guardado!',
				description:
					mode === 'CREATE' ?
						`El curso ha sido creado`
					:	`El curso "${values.title}" ha sido actualizado`,
			})
			navigate('/')
		} else {
			toast({
				title: 'Algo salió mal!',
				description: data.message,
				variant: 'destructive',
			})
		}
	}

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
			navigate('/')
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
			<Alert className='bg-blue-50 border-blue-600'>
				<Info className='h-4 w-4' color='rgb(37 99 235)' />
				<AlertTitle className='text-blue-600'>
					<strong>Formulario de Cursos</strong>
				</AlertTitle>
				<AlertDescription className='text-blue-600'>
					Completa los campos de entrada mostrados a continuación para crear un
					nuevo Curso.
				</AlertDescription>
			</Alert>

			<div className='grid gap-4 mt-4'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
						<div className='hidden'>
							<FormField
								control={form.control}
								name='id'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Identificador del curso</FormLabel>
										<FormControl>
											<Input
												placeholder='Identificador del curso'
												autoComplete='id'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>¿Cuál es el título del curso o materia?</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Ejm. Razonamiento verbal'
											className='resize-none'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='concepts'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										¿Cuáles son los temas o conceptos más relevantes?
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Ejm. Comprensión de textos argumentativos'
											className='resize-none'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='level'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										¿Cuál es el nivel educativo de tus estudiantes?
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Ejm. 2do Primaria, 5to Secundaria, Universitario, etc.'
											className='resize-none'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='start'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Fecha de inicio</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-full pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground',
													)}
												>
													{field.value ?
														courseDateFormatter.format(field.value)
													:	<span>Seleccionar ...</span>}
													<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0' align='start'>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) => date < new Date('1900-01-01')}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='end'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Fecha de finalización</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-full pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground',
													)}
												>
													{field.value ?
														courseDateFormatter.format(field.value)
													:	<span>Seleccionar ...</span>}
													<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0' align='start'>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) => date < new Date('1900-01-01')}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='schedules'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Itinerario del curso</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Ejm. De lunes a viernes, 3 horas cada día'
											className='resize-none'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit' className='w-full mt-4'>
							Guardar cambios
						</Button>

						<Button type='button' variant='outline' className='w-full'>
							<a href='/'>Cancelar</a>
						</Button>

						{mode === 'UPDATE' && (
							<AlertDialogTrigger asChild>
								<Button type='button' variant='destructive' className='w-full'>
									Eliminar curso
								</Button>
							</AlertDialogTrigger>
						)}
					</form>
				</Form>
			</div>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						¿Está seguro de eliminar el curso?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción no se podrá deshacer. Todos los datos del curso serán
						eliminados permanentemente de la de base de datos.
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

export { CourseForm }
