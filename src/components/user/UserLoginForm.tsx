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
import { ArrowRight, Info } from 'lucide-react'
import { Alert, AlertDescription } from '../ui/alert'
import {
	USER_PASSWORD_MAX_LENGTH,
	USER_PASSWORD_MIN_LENGTH,
} from '@/core/users/domain/UserPasswordHash'

const formSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(USER_PASSWORD_MIN_LENGTH)
		.max(USER_PASSWORD_MAX_LENGTH),
})

const UserLoginForm = () => {
	const { toast } = useToast()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const response = await fetch('/api/users/login', {
			method: 'POST',
			headers: {
				'Accept': 'application.json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
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
		<>
			<Alert className='mx-auto max-w-sm bg-blue-50 border-blue-600'>
				<Info className='h-4 w-4' color='rgb(37 99 235)' />
				<AlertDescription className='text-blue-600'>
					Esta aplicación te permite generar{' '}
					<strong>Objetos Virtuales de Aprendizaje (OVAs)</strong> aprovechando
					las bondades de la{' '}
					<strong>Inteligencia Artificial generativa (IA)</strong>.
				</AlertDescription>
			</Alert>

			<Card className='mx-auto max-w-sm mt-4'>
				<CardHeader>
					<CardTitle className='text-xl'>Inicio de sesión</CardTitle>
					<CardDescription>
						Ingresa tus credenciales para iniciar sesión
					</CardDescription>
				</CardHeader>

				<CardContent className='grid gap-4'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
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
												autoComplete='current-password'
												placeholder='Ingresa tu contraseña'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type='submit' className='w-full mt-4'>
								Iniciar sesión <ArrowRight className='ml-2 h-4 w-4' />
							</Button>

							<Button type='button' variant='outline' className='w-full'>
								Iniciar sesión con Google
							</Button>

							<Button type='button' variant='outline' className='w-full'>
								Iniciar sesión con LinkedIn
							</Button>
						</form>
					</Form>

					<div className='mt-4 text-center text-sm'>
						Aún no estás registrado?{' '}
						<Button variant='link' className='underline'>
							<a href='/signup'>Crear una cuenta</a>
						</Button>
					</div>
				</CardContent>
			</Card>
		</>
	)
}

export { UserLoginForm }
