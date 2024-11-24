import { navigate } from 'astro:transitions/client'
import { useEffect, useState } from 'react'
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
import {
	CalendarIcon,
	Fullscreen,
	Image,
	Info,
	LoaderCircle,
	Sparkles,
	Video,
} from 'lucide-react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Lesson } from '@/core/lessons/domain/Lesson'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Switch } from '../ui/switch'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { lessonDateFormatter } from '@/core/lessons/domain/LessonDate'
import {
	LESSON_TITLE_MAX_LENGTH,
	LESSON_TITLE_MIN_LENGTH,
} from '@/core/lessons/domain/LessonTitle'
import {
	LESSON_CAPTION_MAX_LENGTH,
	LESSON_CAPTION_MIN_LENGTH,
} from '@/core/lessons/domain/LessonCaption'
import { LESSON_CONTENT_MAX_LENGTH } from '@/core/lessons/domain/LessonContent'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import { Label } from '../ui/label'

const formSchema = z
	.object({
		id: z.string().uuid(),
		title: z.string().min(LESSON_TITLE_MIN_LENGTH).max(LESSON_TITLE_MAX_LENGTH),
		caption: z
			.string()
			.min(LESSON_CAPTION_MIN_LENGTH)
			.max(LESSON_CAPTION_MAX_LENGTH)
			.optional(),
		content: z.string().max(LESSON_CONTENT_MAX_LENGTH).optional(),
		start: z.date(),
		end: z.date(),
		includeImages: z.boolean(),
		includeVideos: z.boolean(),
		done: z.boolean(),
		courseId: z.string().uuid(),
	})
	.refine(
		(data) => {
			const minDuration = 0 // 1 día en milisegundos
			const maxDuration = 1 * 24 * 60 * 60 * 1000 // 2 días en milisegundos
			const duration = data.end.getTime() - data.start.getTime()
			return duration >= minDuration && duration <= maxDuration
		},
		{
			message: 'La lección debe durar mínimo 1 día y máximo 2 días.',
			path: ['end'],
		},
	)

const LessonForm = ({
	lesson,
	mode,
}: {
	lesson: Lesson
	mode: 'CREATE' | 'UPDATE'
}) => {
	const { toast } = useToast()
	const [markdownContent, setMarkdownContent] = useState<string>(
		lesson.content || '',
	)
	const [generating, setGenerating] = useState<boolean>(false)
	const [imagePrompt, setImagePrompt] = useState<string>('')

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: lesson.id,
			title: lesson.title || '',
			caption: lesson.caption || '',
			content: lesson.content || '',
			start: lesson.start ? new Date(lesson.start) : undefined,
			end: lesson.end ? new Date(lesson.end) : undefined,
			includeImages: true,
			includeVideos: true,
			done: lesson.done,
			courseId: lesson.courseId,
		},
	})

	useEffect(() => {
		if (lesson?.videoId?.length && !lesson?.video?.length) {
			getVideo()
		}
	}, [])

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const response = await fetch(`/api/lessons`, {
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
				title: 'Lección guardada!',
				description:
					mode === 'CREATE' ?
						`La lección ha sido creada`
					:	`La lección "${values.title}" ha sido actualizada`,
			})
			if (mode === 'CREATE') {
				navigate('/courses/details/' + lesson.courseId)
			}
		} else {
			toast({
				title: 'Algo salió mal!',
				description: data.message,
				variant: 'destructive',
			})
		}
	}

	const onGenerateContent = async () => {
		setGenerating(true)

		const response = await fetch(`/api/lessons/generate/content`, {
			method: 'POST',
			headers: {
				'Accept': 'application.json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ lesson }),
		})
		const data = await response.json()

		if (data.message === 'success') {
			window.location.reload()
		} else {
			toast({
				title: 'Algo salió mal!',
				description: data.message,
				variant: 'destructive',
			})
		}

		setGenerating(false)
	}

	const onGenerateImage = async () => {
		if (!imagePrompt?.length) {
			toast({
				title: 'Prompt requerido!',
				description: 'Debes ingresar un prompt que describa la imágen',
				variant: 'destructive',
			})
			return
		}

		toast({
			title: 'Generando imágen ...',
			description:
				'La imágen se está generando en segundo plano. Cuando termine, se actualizará la lección.',
		})

		const response = await fetch(`/api/lessons/generate/image`, {
			method: 'POST',
			headers: {
				'Accept': 'application.json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ lesson, imagePrompt }),
		})
		const data = await response.json()

		if (data.message === 'success') {
			window.location.reload()
		} else {
			toast({
				title: 'Algo salió mal!',
				description: data.message,
				variant: 'destructive',
			})
		}
	}

	const onGenerateVideo = async () => {
		if (!lesson?.image?.length) {
			toast({
				title: 'Imágen requerida!',
				description: 'Antes de generar un video, debes generar una imágen',
				variant: 'destructive',
			})
			return
		}

		toast({
			title: 'Generando vídeo ...',
			description:
				'El vídeo se está generando en segundo plano. Cuando termine, se actualizará la lección.',
		})

		const response = await fetch(`/api/lessons/generate/video`, {
			method: 'POST',
			headers: {
				'Accept': 'application.json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ lesson }),
		})
		const data = await response.json()

		if (data.message === 'success') {
			// window.location.reload()
		} else {
			toast({
				title: 'Algo salió mal!',
				description: data.message,
				variant: 'destructive',
			})
		}
	}

	const getVideo = async () => {
		if (lesson?.videoId?.length && !lesson?.video?.length) {
			const response = await fetch('/api/lessons/generate/video-result', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ lesson }),
			})
			const data = await response.json()

			if (data.message === 'success') {
				toast({
					title: 'El vídeo se ha generado ...',
					description: 'El vídeo se termino de generar. Actualiza la lección.',
				})
			}
		}
	}

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
			<div className='grid gap-4'>
				<Tabs defaultValue={mode === 'CREATE' ? 'DETAIL' : 'CONTENT'}>
					<TabsList>
						{mode === 'UPDATE' && (
							<TabsTrigger value='CONTENT'>Contenido</TabsTrigger>
						)}
						{mode === 'UPDATE' && (
							<TabsTrigger value='EDITOR'>Editor</TabsTrigger>
						)}
						<TabsTrigger value='DETAIL'>Detalles</TabsTrigger>
					</TabsList>

					<TabsContent value='CONTENT'>
						{markdownContent?.length ?
							<div className='w-dvw grid gap-4 pr-10 py-4'>
								<div className='grid grid-cols-[1fr_min-content_min-content] gap-2'>
									<Button
										variant='outline'
										onClick={() => navigate('/lessons/preview/' + lesson.id)}
									>
										<Fullscreen className='h-4 w-4 mr-2' />
										Ver en pantalla completa
									</Button>

									<Dialog>
										<DialogTrigger asChild>
											<Button variant='default' size='icon'>
												<Image className='h-4 w-4' />
											</Button>
										</DialogTrigger>

										<DialogContent className='max-w-[400px]'>
											<DialogHeader>
												<DialogTitle>Generación de imágenes con AI</DialogTitle>
												<DialogDescription>
													Usa este formulario para generar una imágen para tu
													lección en base a un prompt.
												</DialogDescription>
											</DialogHeader>
											<div className='grid gap-4 py-4'>
												<Label htmlFor='imagePrompt'>Prompt</Label>
												<Textarea
													id='imagePrompt'
													placeholder='Ejm. Mapa geográfico de Perú en el año 1870'
													maxLength={500}
													autoComplete='off'
													autoCorrect='on'
													autoCapitalize='on'
													spellCheck={true}
													onChange={(e) => setImagePrompt(e.target.value)}
												/>
											</div>
											<DialogFooter>
												<DialogClose asChild>
													<Button type='button' onClick={onGenerateImage}>
														Generar imágen
													</Button>
												</DialogClose>
											</DialogFooter>
										</DialogContent>
									</Dialog>

									<Dialog>
										<DialogTrigger asChild>
											<Button variant='default' size='icon'>
												<Video className='h-4 w-4' />
											</Button>
										</DialogTrigger>

										<DialogContent className='max-w-[400px]'>
											<DialogHeader>
												<DialogTitle>Generación de vídeos con AI</DialogTitle>
												<DialogDescription>
													Generar un vídeo para tu lección en base a la imágen
													previamente generada.
												</DialogDescription>
											</DialogHeader>

											<div className='w-full'>
												{lesson?.image?.length && (
													<img
														className='block rounded-md'
														src={lesson.image}
														alt={lesson.title}
													/>
												)}
											</div>

											<DialogFooter>
												<DialogClose asChild>
													<Button type='button' onClick={onGenerateVideo}>
														Generar vídeo
													</Button>
												</DialogClose>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								</div>

								{lesson?.image?.length && !lesson?.video?.length && (
									<img
										className='block rounded-md min-w-xs w-full max-w-md'
										src={lesson.image}
										alt={lesson.title}
									/>
								)}

								{lesson?.video?.length && (
									<video
										className='block rounded-md min-w-xs w-full max-w-md'
										src={lesson.video}
										controls
										loop
									/>
								)}

								<ReactMarkdown
									className='markdown-body'
									remarkPlugins={[remarkGfm]}
								>
									{markdownContent}
								</ReactMarkdown>
							</div>
						:	<div className='grid'>
								<span className='text-slate-600 text-center py-8'>
									No hay contenido para previsualizar
								</span>
								{!markdownContent?.length &&
									(generating ?
										<Button disabled>
											<LoaderCircle className='h-4 w-4 mr-2 animate-spin' />
											Generando contenido automáticamente
										</Button>
									:	<Button onClick={onGenerateContent}>
											<Sparkles className='h-4 w-4 mr-2' />
											Generar contenido automáticamente
										</Button>)}
							</div>
						}
					</TabsContent>

					<TabsContent value='EDITOR'>
						<Alert className='bg-blue-50 border-blue-600 mb-4'>
							<Info className='h-4 w-4' color='rgb(37 99 235)' />
							<AlertTitle className='text-blue-600'>
								<strong>Editor de la Lección</strong>
							</AlertTitle>
							<AlertDescription className='text-blue-600'>
								Aquí podrás realizar las modificaciones que creas necesarias
								sobre el contenido generado por la IA.
							</AlertDescription>
						</Alert>

						{!markdownContent?.length &&
							(generating ?
								<Button className='w-full mb-4' disabled>
									<LoaderCircle className='h-4 w-4 mr-2 animate-spin' />
									Generando contenido automáticamente
								</Button>
							:	<Button className='w-full mb-4' onClick={onGenerateContent}>
									<Sparkles className='h-4 w-4 mr-2' />
									Generar contenido automáticamente
								</Button>)}

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='grid gap-4'
							>
								<FormField
									control={form.control}
									name='content'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Textarea
													placeholder='Escribir aquí ...'
													className='resize-none h-dvh'
													{...field}
													onChange={(e) => {
														setMarkdownContent(e.target.value)
														field.onChange(e)
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type='submit' className='w-full mt-4'>
									Guardar cambios
								</Button>

								{markdownContent?.length &&
									(generating ?
										<Button className='w-full' variant='secondary' disabled>
											<LoaderCircle className='h-4 w-4 mr-2 animate-spin' />
											Generando contenido automáticamente
										</Button>
									:	<Button
											className='w-full'
											variant='secondary'
											onClick={onGenerateContent}
										>
											<Sparkles className='h-4 w-4 mr-2' />
											Re-generar contenido automáticamente
										</Button>)}

								<Button type='button' variant='outline' className='w-full'>
									<a href='/'>Cancelar</a>
								</Button>

								{mode === 'UPDATE' && (
									<AlertDialogTrigger asChild>
										<Button
											type='button'
											variant='destructive'
											className='w-full'
										>
											Eliminar lección
										</Button>
									</AlertDialogTrigger>
								)}
							</form>
						</Form>
					</TabsContent>

					<TabsContent value='DETAIL'>
						<Alert className='bg-blue-50 border-blue-600 mb-4'>
							<Info className='h-4 w-4' color='rgb(37 99 235)' />
							<AlertTitle className='text-blue-600'>
								<strong>Formulario de la Lección</strong>
							</AlertTitle>
							<AlertDescription className='text-blue-600'>
								Aquí podrás actualizar el título, descripción de la lección.
							</AlertDescription>
						</Alert>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='grid gap-4'
							>
								<div className='hidden'>
									<FormField
										control={form.control}
										name='id'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Identificador de la lección</FormLabel>
												<FormControl>
													<Input
														placeholder='Identificador de la lección'
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
											<FormLabel>Título de la lección</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Título de la lección'
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
									name='caption'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Descripción de la lección</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Descripción de la lección'
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
																lessonDateFormatter.format(
																	new Date(field.value),
																)
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
																lessonDateFormatter.format(
																	new Date(field.value),
																)
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
									name='includeImages'
									render={({ field }) => (
										<FormItem>
											<FormLabel>¿Incluir imágenes?</FormLabel>
											<FormControl>
												<Switch
													className='block'
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='includeVideos'
									render={({ field }) => (
										<FormItem>
											<FormLabel>¿Incluir vídeos?</FormLabel>
											<FormControl>
												<Switch
													className='block'
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='done'
									render={({ field }) => (
										<FormItem>
											<FormLabel>¿Lección finalizada?</FormLabel>
											<FormControl>
												<Switch
													className='block'
													checked={field.value}
													onCheckedChange={field.onChange}
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
										<Button
											type='button'
											variant='destructive'
											className='w-full'
										>
											Eliminar lección
										</Button>
									</AlertDialogTrigger>
								)}
							</form>
						</Form>
					</TabsContent>
				</Tabs>
			</div>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						¿Está seguro de eliminar esta lección?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción no se podrá deshacer. Todos los datos de la lección
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

export { LessonForm }
