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
			done: true,
			content: `# Introducción a Astro - Un viaje al desarrollo web moderno\n**¡Hola, futuros maestros del desarrollo web con Astro!** 👋\nEn esta ocacición, exploraremos juntos los fundamentos de Astro, un framework de desarrollo web moderno diseñado para crear sitios web rápidos, escalables y fáciles de mantener.\n## Antes de la clase\n* **Lectura previa:**\n\t* **[Introducción a Astro](https://astro.build/docs/introduction/):** Lee la introducción oficial de Astro, que ofrece una visión general del framework y sus características principales.\n\t* **[Astro vs. Next.js vs. Nuxt.js](https://www.freecodecamp.org/news/astro-vs-next-js-vs-nuxt-js-which-is-best-for-you/):** Compara y contrasta Astro con otros frameworks populares.\n* **Ejercicios preparatorios:**\n\t* **Creación de un proyecto Astro:**  Crea un nuevo proyecto Astro utilizando la CLI ([https://astro.build/](https://astro.build/)). Familiarízate con la estructura de archivos y los scripts de inicio.\n\t* **Implementación de componentes Astro básicos:** Experimenta con la creación de componentes simples y la renderización de contenido estático con Astro.\n## **Durante la clase:**\n**1. Introducción a Astro**\n* **¿Qué es Astro?**\n\t* Astro es un framework de desarrollo web de código abierto que utiliza la renderización de servidor (SSR) y el contenido estático para optimizar la velocidad de carga y el rendimiento de los sitios web.\n\t* Astro se diferencia de otros frameworks como Next.js y Nuxt.js al priorizar el rendimiento sobre la interactividad. Esto significa que Astro solo renderiza JavaScript cuando es necesario, como en componentes interactivos.\n* **Beneficios de Astro:**\n\t* **Rendimiento:**  Astro es increíblemente rápido gracias a su enfoque en la renderización estática. Los sitios web de Astro se cargan rápidamente, lo que mejora la experiencia del usuario.\n\t* **Escalabilidad:** Astro es ideal para aplicaciones de gran tamaño y sitios web con mucho contenido.\n\t* **Facilidad de uso:** Astro tiene una curva de aprendizaje suave y una documentación clara.\n\t* **Comunidad:**  Astro cuenta con una comunidad activa y en crecimiento que ofrece soporte y recursos adicionales.\n**2. Arquitectura de Astro**\n* **Componentes web:** Los componentes web son la unidad fundamental de la construcción de aplicaciones Astro. Estos componentes son módulos de código reutilizables que encapsulan el HTML, CSS y JavaScript necesarios para crear elementos de la interfaz de usuario.\n* **Enrutamiento:**  Astro utiliza un sistema de enrutamiento simple y poderoso que permite definir rutas para diferentes páginas y componentes.\n* **End-points:** Los end-points son puntos de acceso a datos y funciones que se ejecutan en el servidor. Astro permite la integración con APIs y bases de datos para acceder a información dinámica.\n* **Actions:**  Las actions son funciones que se ejecutan en el servidor y pueden acceder a datos y recursos del lado del servidor. Se utilizan para realizar tareas como la validación de formularios, la interacción con bases de datos y la autenticación de usuarios.\n* **AstroDB:** AstroDB es un servicio de base de datos sin servidor que se integra fácilmente con Astro. Permite almacenar y recuperar datos de forma sencilla sin necesidad de configurar y administrar una base de datos tradicional.\n**3. Ejemplo práctico:**\n* **Creación de un componente de bienvenida:** \n\t\`\`\`html\n\t---\n\timport { Astro } from "astro/routing";\n\tconst name = Astro.params.name;\n\t---\n\t<h1>¡Hola, {name}!</h1>\n\t<p>Bienvenido al mundo de Astro.</p>\n\t\`\`\`\n* **Uso del componente:**\n\t\`\`\`html\n\t<Welcome name="John Doe" />\n\t\`\`\`\n**4. Demostración de Astro en acción:**\n* **Creación de una aplicación web básica con Astro:** \n\t* Mostrar cómo crear una aplicación web simple que incluya diferentes páginas, componentes y enrutamiento.\n\t* Integrar un end-point para obtener datos de una API y mostrarlos en la aplicación.\n* **Uso de AstroDB para guardar datos:**\n\t* Mostrar cómo guardar datos en AstroDB y recuperarlos en un componente.\n## Después de la clase:\n* **Revisión de los ejemplos:**  Revisar y analizar los ejemplos de código proporcionados durante la clase.\n* **Ejercicios prácticos:**\n\t* **Construcción de un componente interactivo con Astro:** Crear un componente interactivo que use JavaScript para cambiar el contenido del componente.\n\t* **Implementación de un end-point para una API externa:** Obtener datos de una API externa y mostrarlos en la aplicación Astro.\n\t* **Creación de una aplicación web con varias páginas:** Diseñar y desarrollar una aplicación web con Astro que incluya al menos tres páginas diferentes.\n* **Lectura adicional:**\n\t* **[Documentación oficial de Astro](https://astro.build/docs):**  Profundizar en la documentación oficial para obtener más información sobre las características y los recursos de Astro.\n\t* **[Recursos de la comunidad Astro](https://astro.build/community):**  Explorar los recursos de la comunidad Astro, incluyendo el foro, los canales de comunicación y los proyectos de ejemplo.\n* **Proyectos de desarrollo:**\n\t* **Desarrollo de un sitio web personal o profesional con Astro:** \n\t* **Creación de un portafolio de proyectos web con Astro:**\n**Recursos adicionales:**\n* **[Astro - Getting Started](https://www.youtube.com/watch?v=5x20X1Z_h1k)**\n* **[Astro: a quick start](https://www.youtube.com/watch?v=Y-F7y-1Y2k4)**\n* **[Astro Docs](https://astro.build/docs)**\n* **[Astro Community](https://astro.build/community)**\n`,
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
