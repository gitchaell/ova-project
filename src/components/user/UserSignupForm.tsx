import { navigate } from 'astro:transitions/client'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
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
import { USER_NAMES_MAX_LENGTH } from '@/core/users/domain/UserNames'
import {
	USER_PASSWORD_MAX_LENGTH,
	USER_PASSWORD_MIN_LENGTH,
} from '@/core/users/domain/UserPasswordHash'

const formSchema = z.object({
	firstname: z
		.string()
		.min(2)
		.max(USER_NAMES_MAX_LENGTH / 2),
	lastname: z
		.string()
		.min(2)
		.max(USER_NAMES_MAX_LENGTH / 2),
	email: z.string().email(),
	password: z
		.string()
		.min(USER_PASSWORD_MIN_LENGTH)
		.max(USER_PASSWORD_MAX_LENGTH),
})

const UserSignupForm = () => {
	const { toast } = useToast()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const response = await fetch('/api/users/signup', {
			method: 'POST',
			headers: {
				'Accept': 'application.json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
		const data = await response.json()

		if (data.message === 'success') {
			form.reset()
			toast({
				title: 'Registrado!',
				description:
					'Te has registrado correctamente! Redireccionando a inicio de sesión ...',
			})
			setTimeout(() => {
				navigate('/login')
			}, 3000)
		} else {
			toast({
				title: 'Algo salió mal!',
				description: data.message,
				variant: 'destructive',
			})
		}
	}

	return (
		<Card className='mx-auto max-w-sm'>
			<CardHeader>
				<CardTitle className='text-xl'>Registro de usuarios</CardTitle>
				<CardDescription>
					Ingresa tu información para registrarte como nuevo usuario
				</CardDescription>
			</CardHeader>

			<CardContent className='grid gap-4'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='firstname'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombres</FormLabel>
										<FormControl>
											<Input
												placeholder='Jhon'
												autoComplete='given-name'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='lastname'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Apellidos</FormLabel>
										<FormControl>
											<Input
												placeholder='Doe'
												autoComplete='family-name'
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
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Correo electrónico</FormLabel>
									<FormControl>
										<Input
											type='email'
											autoComplete='email'
											placeholder='maestro@escuela.com'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contraseña</FormLabel>
									<FormControl>
										<Input
											type='password'
											autoComplete='new-password'
											placeholder='Crea un contraseña segura'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit' className='w-full mt-4'>
							Crear una cuenta
						</Button>

						<Button type='button' variant='outline' className='w-full'>
							Registrarme con LinkedIn
						</Button>
					</form>
				</Form>

				<div className='mt-4 text-center text-sm'>
					¿Ya estás registrado?{' '}
					<Button variant='link' className='underline'>
						<a href='/login'>Iniciar sesión</a>
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}

export { UserSignupForm }
