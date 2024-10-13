import { CommandDialog } from 'cmdk'
import { User, CreditCard, Settings, BadgeCheck, House } from 'lucide-react'
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

export function Menu() {
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

	return (
		<CommandDialog
			open={open}
			onOpenChange={setOpen}
			className='fixed top-16 left-0 right-0 mx-2'
		>
			<Command className='rounded-lg border shadow-md md:min-w-[450px]'>
				<CommandInput placeholder='Busca tus cursos o sesiones usando palabras clave...' />
				<CommandList>
					<CommandEmpty>Resultados no encontrados</CommandEmpty>
					<CommandGroup heading='Sugerencias'>
						{Array.from({ length: 3 })
							.fill(null)
							.map((_, i) => (
								<CommandItem key={i}>
									<BadgeCheck className='mr-2 h-4 w-4' />
									<span>Curso #{i + 1}</span>
								</CommandItem>
							))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Settings'>
						<CommandItem onSelect={() => (window.location.href = '/')}>
							<House className='mr-2 h-4 w-4' />
							<span>Inicio</span>
							<CommandShortcut>⌘H</CommandShortcut>
						</CommandItem>

						<CommandItem onSelect={() => (window.location.href = '/profile')}>
							<User className='mr-2 h-4 w-4' />
							<span>Perfil</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>

						<CommandItem onSelect={() => (window.location.href = '/billing')}>
							<CreditCard className='mr-2 h-4 w-4' />
							<span>Suscripción</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>

						<CommandItem onSelect={() => (window.location.href = '/settings')}>
							<Settings className='mr-2 h-4 w-4' />
							<span>Ajustes</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</CommandDialog>
	)
}
