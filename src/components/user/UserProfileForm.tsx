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
import { Info } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '../ui/alert'
import { Textarea } from '../ui/textarea'
import type { User } from '@/core/users/domain/User'
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
} from '../ui/alert-dialog'
import {
	USER_NAMES_MAX_LENGTH,
	USER_NAMES_MIN_LENGTH,
} from '@/core/users/domain/UserNames'

const formSchema = z.object({
	names: z.string().min(USER_NAMES_MIN_LENGTH).max(USER_NAMES_MAX_LENGTH),
	school: z.string().min(2).max(700),
	skills: z.string().min(2).max(700),
})

const UserProfileForm = ({ user }: { user: User }) => {
	const { toast } = useToast()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			names: user.names,
			school: user.school || '',
			skills: user.skills || '',
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const response = await fetch(`/api/users/${user.id}/profile`, {
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
				title: 'Datos actualizados!',
				description: 'Tus datos han sido actualizados',
			})
		} else {
			toast({
				title: 'Algo salió mal!',
				description: data.message,
				variant: 'destructive',
			})
		}
	}

	const onDeleteAccount = async () => {
		const response = await fetch(`/api/users/${user.id}/remove`, {
			method: 'POST',
		})
		const data = await response.json()

		if (data.message === 'success') {
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
					<strong>Formulario de datos personales</strong>
				</AlertTitle>
				<AlertDescription className='text-blue-600'>
					En este espacio puede detallar datos que pueden ser de mayor utilidad
					en la generación de las lecciones de tus cursos.
				</AlertDescription>
			</Alert>

			<div className='grid gap-4 mt-4'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
						<FormField
							control={form.control}
							name='names'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre completo</FormLabel>
									<FormControl>
										<Input
											placeholder='Ingresa tus nombres y apellidos'
											autoComplete='name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='school'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre de tu centro educativo</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Centro educativo, plataforma virtual, etc.'
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
							name='skills'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tu especialidad en cursos o materias</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Matemáticas de nivel primaria, comunicación verbal, historia, etc.'
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
							<a href='/'>Volver al inicio</a>
						</Button>

						<AlertDialogTrigger asChild>
							<Button type='button' variant='destructive' className='w-full'>
								Eliminar cuenta de usuario
							</Button>
						</AlertDialogTrigger>
					</form>
				</Form>
			</div>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						¿Está seguro de eliminar tu cuenta?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción no se podrá deshacer. Todos los datos de tu cuenta serán
						eliminados permanentemente de la de base de datos.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
						onClick={onDeleteAccount}
					>
						Eliminar cuenta
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export { UserProfileForm }
