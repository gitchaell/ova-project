import { navigate } from 'astro:transitions/client'
import { CommandDialog } from 'cmdk'
import { User, Settings, BadgeCheck, House, LogOut } from 'lucide-react'
import React from 'react'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/ui/command'
import { useToast } from '@/hooks/use-toast'
import type { Course } from '@/core/courses/domain/Course'

export function Menu({ courses }: { courses: Course[] }) {
	const { toast } = useToast()
	const [open, setOpen] = React.useState(false)

	React.useEffect(() => {
		const toggle = (e: KeyboardEvent) => {
			e.preventDefault()
			setOpen((open) => !open)
		}
		const togglefromKeydown = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}
		document.addEventListener('keydown', togglefromKeydown)
		document.addEventListener('openMenuEvent', toggle as EventListener)
		return () => {
			document.removeEventListener('keydown', togglefromKeydown)
			document.removeEventListener('openMenuEvent', toggle as EventListener)
		}
	}, [])

	const onLogout = async () => {
		const response = await fetch('/api/users/logout', { method: 'POST' })
		const data = await response.json()

		if (data.message === 'success') {
			navigate('/login')
		} else {
			toast({
				title: 'Algo salió mal!',
				description: data.message,
				variant: 'destructive',
			})
		}
	}

	return (
		<CommandDialog
			open={open}
			onOpenChange={setOpen}
			className='fixed top-16 left-0 right-0 mx-2'
		>
			<Command className='rounded-lg border shadow-md md:min-w-[450px]'>
				<CommandInput placeholder='Busca tus cursos usando palabras clave...' />
				<CommandList>
					<CommandEmpty>0 coincidencias</CommandEmpty>
					<CommandGroup heading='Sugerencias'>
						{courses.map((course) => (
							<CommandItem key={course.id} onSelect={() => navigate(`/courses/details/${course.id}`)}>
								<BadgeCheck className='mr-2 h-4 w-4' />
								<span>Curso: {course.title}</span>
							</CommandItem>
						))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Menú de opciones'>
						<CommandItem onSelect={() => navigate('/')}>
							<House className='mr-2 h-4 w-4' />
							<span>Inicio</span>
							<CommandShortcut>⌘H</CommandShortcut>
						</CommandItem>

						<CommandItem onSelect={() => navigate('/profile')}>
							<User className='mr-2 h-4 w-4' />
							<span>Perfil</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						{/* 
						<CommandItem onSelect={() => navigate('/billing')}>
							<CreditCard className='mr-2 h-4 w-4' />
							<span>Suscripción</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem> */}

						<CommandItem onSelect={() => navigate('/profile')}>
							<Settings className='mr-2 h-4 w-4' />
							<span>Ajustes</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>

						<CommandItem onSelect={onLogout}>
							<LogOut className='mr-2 h-4 w-4' color='rgb(239 68 68)' />
							<span className='text-red-500'>Cerrar sesión</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</CommandDialog>
	)
}
