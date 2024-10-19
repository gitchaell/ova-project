import { Lesson } from 'astro:db'
import { db, User, Course } from 'astro:db'
import { randomUUID } from 'node:crypto'

// https://astro.build/db/seed
export default async function seed() {
	const userId = randomUUID()
	const courseId = randomUUID()

	await db.insert(User).values([
		{
			id: userId,
			photoUrl:
				'https://m.media-amazon.com/images/I/41+jrimaRpL._UXNaN_FMjpg_QL85_.jpg',
			names: 'John Doe',
			email: 'john.doe@ovaia.com',
			// password:'12345678',
			passwordHash:
				'$argon2id$v=19$m=19456,t=2,p=1$xikzHoEOuxEJ9VvQpHGtWg$fyGKT+foZ1j/ilrp+5EZpSL65nvayw/nvp1LBxtizT8',
			school: 'Tengo mi propia plataforma online en donde imparto mis cursos',
			skills:
				'Principalmente me dedico a enseñar temas de programación y desarrollo de software',
		},
	])
	await db.insert(Course).values([
		{
			id: courseId,
			title: 'Programación web con el framework Astro',
			concepts: 'Componentes Web, Enrutamiento, End-points, Actions, AstroDB',
			level: 'Programadores con conocimiento de nivel intermedio y avanzado',
			start: new Date(2024, 8, 1),
			end: new Date(2024, 11, 31),
			schedules: 'Cada domingo, 5 horas al día',
			userId,
		},
		{
			id: randomUUID(),
			title: 'PostgreSQL Base de datos no relacional',
			concepts:
				'Diseños de base de datos, sentencias DML y DDL,  relaciones entre tablas, triggers, procedimientos almacenados, transacciones, backups, joins.',
			level: 'Seniors de nivel alto-avanzado',
			start: new Date(2024, 9, 1),
			end: new Date(2024, 9, 31),
			schedules: 'De lunes a viernes, 3 horas cada día',
			userId,
		},
	])
	await db.insert(Lesson).values([
		{
			id: randomUUID(),
			title: 'Introducción a Astro',
			caption:
				'Comprender los conceptos fundamentales de Astro y su arquitectura. Exploración de las ventajas de Astro para el desarrollo web moderno.',
			start: new Date(2024, 8, 1),
			end: new Date(2024, 8, 1),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Instalación y configuración de Astro',
			caption:
				'Instalación de Astro en el entorno de desarrollo. Configuración inicial del proyecto Astro y exploración de la estructura de archivos.',
			start: new Date(2024, 8, 8),
			end: new Date(2024, 8, 8),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Componentes Web con Astro',
			caption:
				'Introducción a los componentes web en Astro. Creación de componentes reutilizables y su uso en diferentes páginas.',
			start: new Date(2024, 8, 15),
			end: new Date(2024, 8, 15),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Enrutamiento en Astro',
			caption:
				'Manejo de rutas en Astro para la creación de páginas y componentes dinámicos. Utilización de la configuración de enrutamiento y la creación de rutas anidadas.',
			start: new Date(2024, 8, 22),
			end: new Date(2024, 8, 22),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'End-Points y Actions en Astro',
			caption:
				'Introducción a End-Points y Actions en Astro. Creación de funciones que manejan datos del servidor y la interacción con API externas.',
			start: new Date(2024, 8, 29),
			end: new Date(2024, 8, 29),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'AstroDB: Gestión de datos en Astro',
			caption:
				'Introducción a AstroDB para la gestión de datos en aplicaciones Astro. Manejo de bases de datos, almacenamiento de datos y recuperación de información.',
			start: new Date(2024, 9, 6),
			end: new Date(2024, 9, 6),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Integración de Astro con otras tecnologías',
			caption:
				'Exploración de la integración de Astro con otras tecnologías como React, Vue.js y otras bibliotecas populares.',
			start: new Date(2024, 9, 13),
			end: new Date(2024, 9, 13),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Optimización de rendimiento en Astro',
			caption:
				'Introducción a las técnicas de optimización del rendimiento de las aplicaciones Astro. Optimización de código, imágenes y recursos.',
			start: new Date(2024, 9, 20),
			end: new Date(2024, 9, 20),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Pruebas unitarias en Astro',
			caption:
				'Introducción a las pruebas unitarias en Astro. Creación de pruebas para componentes y funciones.',
			start: new Date(2024, 9, 27),
			end: new Date(2024, 9, 27),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Implementación de aplicaciones Astro',
			caption:
				'Práctica de la implementación de aplicaciones Astro en diferentes entornos de alojamiento.',
			start: new Date(2024, 10, 3),
			end: new Date(2024, 10, 3),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Casos de uso y ejemplos de proyectos con Astro',
			caption:
				'Análisis de diferentes casos de uso de Astro en proyectos reales. Estudio de ejemplos de proyectos exitosos implementados con Astro.',
			start: new Date(2024, 10, 10),
			end: new Date(2024, 10, 10),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Tendencias y futuro de Astro',
			caption:
				'Análisis de las últimas tendencias en el desarrollo web con Astro. Exploración del futuro de Astro y sus posibles aplicaciones.',
			start: new Date(2024, 10, 17),
			end: new Date(2024, 10, 17),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Proyecto final: Desarrollo de una aplicación web con Astro',
			caption:
				'Aplicación práctica de los conocimientos adquiridos en el curso. Desarrollo de una aplicación web completa utilizando Astro.',
			start: new Date(2024, 10, 24),
			end: new Date(2024, 11, 1),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Presentación de proyectos finales y cierre del curso',
			caption:
				'Presentación de los proyectos finales desarrollados por los estudiantes. Discusión de los resultados y cierre del curso.',
			start: new Date(2024, 11, 8),
			end: new Date(2024, 11, 8),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Sesión de preguntas y respuestas',
			caption:
				'Resolución de dudas finales de los estudiantes. Discusión sobre temas relacionados con el curso y el desarrollo web.',
			start: new Date(2024, 11, 15),
			end: new Date(2024, 11, 15),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Evaluación final del curso',
			caption:
				'Entrega de la evaluación final del curso. Retroalimentación y análisis de los resultados.',
			start: new Date(2024, 11, 22),
			end: new Date(2024, 11, 22),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Cierre del curso',
			caption:
				'Palabras de despedida y agradecimiento a los estudiantes por su participación en el curso.',
			start: new Date(2024, 11, 29),
			end: new Date(2024, 11, 29),
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Sesión de seguimiento y apoyo',
			caption:
				'Disponible para ofrecer apoyo y orientación a los estudiantes después de finalizar el curso.',
			start: new Date(2024, 11, 31),
			end: new Date(2024, 11, 31),
			courseId,
		},
	])
}
