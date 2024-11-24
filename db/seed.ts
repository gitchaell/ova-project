import * as dotenv from 'dotenv'
import { db, User, Course, Lesson } from 'astro:db'
import { randomUUID } from 'node:crypto'

dotenv.config()

// https://astro.build/db/seed
export default async function seed() {
	const userId = randomUUID()
	const courseId = randomUUID()

	await db.insert(User).values([
		{
			id: userId,
			photoUrl: '/avatar.webp',
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
			content: `# Introducción a Astro - Un viaje al desarrollo web moderno\n\n**¡Hola, futuros maestros del desarrollo web con Astro!** 👋\nEn esta ocacición, exploraremos juntos los fundamentos de Astro, un framework de desarrollo web moderno diseñado para crear sitios web rápidos, escalables y fáciles de mantener.\n## Antes de la clase\n* **Lectura previa:**\n\t* **[Introducción a Astro](https://astro.build/docs/introduction/):** Lee la introducción oficial de Astro, que ofrece una visión general del framework y sus características principales.\n\t* **[Astro vs. Next.js vs. Nuxt.js](https://www.freecodecamp.org/news/astro-vs-next-js-vs-nuxt-js-which-is-best-for-you/):** Compara y contrasta Astro con otros frameworks populares.\n* **Ejercicios preparatorios:**\n\t* **Creación de un proyecto Astro:**  Crea un nuevo proyecto Astro utilizando la CLI ([https://astro.build/](https://astro.build/)). Familiarízate con la estructura de archivos y los scripts de inicio.\n\t* **Implementación de componentes Astro básicos:** Experimenta con la creación de componentes simples y la renderización de contenido estático con Astro.\n## **Durante la clase:**\n\n**1. Introducción a Astro**\n* **¿Qué es Astro?**\n\t* Astro es un framework de desarrollo web de código abierto que utiliza la renderización de servidor (SSR) y el contenido estático para optimizar la velocidad de carga y el rendimiento de los sitios web.\n\t* Astro se diferencia de otros frameworks como Next.js y Nuxt.js al priorizar el rendimiento sobre la interactividad. Esto significa que Astro solo renderiza JavaScript cuando es necesario, como en componentes interactivos.\n* **Beneficios de Astro:**\n\t* **Rendimiento:**  Astro es increíblemente rápido gracias a su enfoque en la renderización estática. Los sitios web de Astro se cargan rápidamente, lo que mejora la experiencia del usuario.\n\t* **Escalabilidad:** Astro es ideal para aplicaciones de gran tamaño y sitios web con mucho contenido.\n\t* **Facilidad de uso:** Astro tiene una curva de aprendizaje suave y una documentación clara.\n\t* **Comunidad:**  Astro cuenta con una comunidad activa y en crecimiento que ofrece soporte y recursos adicionales.\n\n**2. Arquitectura de Astro**\n* **Componentes web:** Los componentes web son la unidad fundamental de la construcción de aplicaciones Astro. Estos componentes son módulos de código reutilizables que encapsulan el HTML, CSS y JavaScript necesarios para crear elementos de la interfaz de usuario.\n* **Enrutamiento:**  Astro utiliza un sistema de enrutamiento simple y poderoso que permite definir rutas para diferentes páginas y componentes.\n* **End-points:** Los end-points son puntos de acceso a datos y funciones que se ejecutan en el servidor. Astro permite la integración con APIs y bases de datos para acceder a información dinámica.\n* **Actions:**  Las actions son funciones que se ejecutan en el servidor y pueden acceder a datos y recursos del lado del servidor. Se utilizan para realizar tareas como la validación de formularios, la interacción con bases de datos y la autenticación de usuarios.\n* **AstroDB:** AstroDB es un servicio de base de datos sin servidor que se integra fácilmente con Astro. Permite almacenar y recuperar datos de forma sencilla sin necesidad de configurar y administrar una base de datos tradicional.\n\n**3. Ejemplo práctico:**\n* **Creación de un componente de bienvenida:** \n\t\`\`\`html\n\t---\n\timport { Astro } from "astro/routing";\n\tconst name = Astro.params.name;\n\t---\n\t<h1>¡Hola, {name}!</h1>\n\t<p>Bienvenido al mundo de Astro.</p>\n\t\`\`\`\n* **Uso del componente:**\n\t\`\`\`html\n\t<Welcome name="John Doe" />\n\t\`\`\`\n\n**4. Demostración de Astro en acción:**\n* **Creación de una aplicación web básica con Astro:** \n\t* Mostrar cómo crear una aplicación web simple que incluya diferentes páginas, componentes y enrutamiento.\n\t* Integrar un end-point para obtener datos de una API y mostrarlos en la aplicación.\n* **Uso de AstroDB para guardar datos:**\n\t* Mostrar cómo guardar datos en AstroDB y recuperarlos en un componente.\n## Después de la clase:\n* **Revisión de los ejemplos:**  Revisar y analizar los ejemplos de código proporcionados durante la clase.\n* **Ejercicios prácticos:**\n\t* **Construcción de un componente interactivo con Astro:** Crear un componente interactivo que use JavaScript para cambiar el contenido del componente.\n\t* **Implementación de un end-point para una API externa:** Obtener datos de una API externa y mostrarlos en la aplicación Astro.\n\t* **Creación de una aplicación web con varias páginas:** Diseñar y desarrollar una aplicación web con Astro que incluya al menos tres páginas diferentes.\n* **Lectura adicional:**\n\t* **[Documentación oficial de Astro](https://astro.build/docs):**  Profundizar en la documentación oficial para obtener más información sobre las características y los recursos de Astro.\n\t* **[Recursos de la comunidad Astro](https://astro.build/community):**  Explorar los recursos de la comunidad Astro, incluyendo el foro, los canales de comunicación y los proyectos de ejemplo.\n* **Proyectos de desarrollo:**\n\t* **Desarrollo de un sitio web personal o profesional con Astro:** \n\t* **Creación de un portafolio de proyectos web con Astro:**\n\n**Recursos adicionales:**\n* [![Fundamentos de Astro](https://img.youtube.com/vi/4cKPqxGkFZQ/0.jpg)](https://www.youtube.com/watch?v=4cKPqxGkFZQ)\n\n* **[Astro: a quick start](https://www.youtube.com/watch?v=Y-F7y-1Y2k4)**\n* **[Astro Docs](https://astro.build/docs)**\n* **[Astro Community](https://astro.build/community)**\n`,
			image:
				'https://ccrewts3k4o0l1px.public.blob.vercel-storage.com/image-5rLau7AfPsUY1E1SleavGY4bq8G6zr-JwFWY63g6xjlG39Oq8AG2rOMveKWhw.png',
			videoId:
				'4c3142328924c9cf80b0466f49dc466d57c4db30be3ca0341a8a3aef097667b4',
			video:
				'https://ccrewts3k4o0l1px.public.blob.vercel-storage.com/video-symvhr3xnVzz1KrlSZQU3ahKTc6V3L.mp4',
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Instalación y configuración de Astro',
			caption:
				'Instalación de Astro en el entorno de desarrollo. Configuración inicial del proyecto Astro y exploración de la estructura de archivos.',
			start: new Date(2024, 8, 8),
			end: new Date(2024, 8, 8),
			done: true,
			content:
				'## OVA: Instalación y Configuración de Astro\n\n**¡Bienvenido a la aventura con Astro!** En esta lección, exploraremos el fascinante mundo de la construcción de sitios web con el framework Astro, un enfoque moderno y potente para el desarrollo web. Como programadores experimentados, nos adentraremos en los detalles de la instalación, configuración y estructura de un proyecto Astro, preparando el terreno para crear aplicaciones web asombrosas.\n\n**Antes de la clase:**\n\n1. **Investiga:** Familiarízate con la filosofía de Astro. Explora la documentación oficial: [https://astro.build/](https://astro.build/) y lee algunos ejemplos de proyectos creados con Astro: [https://astro.build/showcase](https://astro.build/showcase). \n2. **Prepara tu entorno:** Asegúrate de tener instalado Node.js en tu sistema. Puedes descargar la última versión desde [https://nodejs.org/](https://nodejs.org/).\n3. **Crea una carpeta para tu proyecto Astro:** Elige un nombre descriptivo para tu proyecto y crea una carpeta en tu computadora donde guardarás todos los archivos.\n\n**Durante la clase:**\n\n**Introducción a Astro**\n\nAstro es un framework de desarrollo web de código abierto que se enfoca en la velocidad y la flexibilidad. Utiliza un enfoque \\"Island Architecture\\", donde el contenido estático se renderiza primero y los componentes interactivos se cargan solo cuando son necesarios. Esto permite crear sitios web rápidos y eficientes, ideales para la optimización del SEO y la experiencia del usuario.\n\n**Instalación de Astro**\n\nPara instalar Astro, utilizaremos la herramienta `create-astro-app`. Abre tu terminal y navega hasta la carpeta donde creaste tu proyecto. Ejecuta el siguiente comando:\n\n```bash\nnpm create astro@latest my-astro-app\n```\n\nReemplaza \\"my-astro-app\\" por el nombre que le diste a tu proyecto. Sigue las instrucciones en pantalla para configurar el proyecto.\n\n**Exploración del Proyecto**\n\nUna vez instalado, tu proyecto Astro tendrá una estructura de archivos similar a esta:\n\n| Carpeta | Descripción |\n|---|---|\n| `src` | Contiene el código fuente de tu proyecto. |\n| `src/components` | Almacena los componentes web reutilizables. |\n| `src/pages` | Contiene las páginas de tu sitio web. |\n| `src/styles` | Guarda las hojas de estilo de tu proyecto. |\n| `public` | Almacena archivos estáticos como imágenes, CSS, etc. |\n| `astro.config.mjs` | Configura el comportamiento de Astro. |\n| `package.json` | Describe las dependencias del proyecto y los scripts para tareas de desarrollo. |\n\n**Creación de tu primera página**\n\nCrea una nueva página en la carpeta `src/pages` con el nombre `index.astro`.\n\n**Estructura de un componente Astro**\n\n```astro\n---\nimport MyComponent from \'../components/MyComponent.astro\';\n---\n\n<html lang=\\"en\\">\n  <head>\n    <meta charset=\\"UTF-8\\" />\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\n    <title>Mi primera página Astro</title>\n  </head>\n  <body>\n    <h1>¡Hola desde Astro!</h1>\n    <MyComponent />\n  </body>\n</html>\n```\n\n**Ejecución del proyecto**\n\nEjecuta el siguiente comando para iniciar el servidor de desarrollo de Astro:\n\n```bash\nnpm run dev\n```\n\n**Configuración del proyecto**\n\nEl archivo `astro.config.mjs` te permite personalizar la configuración de Astro. Puedes agregar:\n\n* **Rutas personalizadas:** Define rutas adicionales para tu sitio web.\n* **Plugins:** Integra plugins para ampliar las funcionalidades de Astro.\n* **Variables de entorno:** Define variables que pueden ser accedidas en tu proyecto.\n\n**Recursos adicionales:**\n\n* **Documentación oficial de Astro:** [https://astro.build/](https://astro.build/)\n* **Astro Learn:** [https://astro.build/learn/](https://astro.build/learn/)\n* **Ejemplos de proyectos Astro:** [https://astro.build/showcase](https://astro.build/showcase/)\n\n**Después de la clase:**\n\n1. **Experimenta:** Crea un pequeño proyecto con Astro para practicar la creación de componentes, la configuración de rutas y la integración de plugins.\n2. **Explora:** Investiga sobre las diferentes funciones que ofrece Astro para el desarrollo web.\n3. **Comparte:** Comparte tus experiencias y descubrimientos con Astro en la comunidad online.\n\n**Recuerda:** ¡La práctica es la clave! A medida que desarrolles más proyectos con Astro, ganarás una comprensión profunda de sus capacidades y beneficios. ¡Aprovecha al máximo este framework y crea sitios web asombrosos!',
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Componentes Web con Astro',
			caption:
				'Introducción a los componentes web en Astro. Creación de componentes reutilizables y su uso en diferentes páginas.',
			start: new Date(2024, 8, 15),
			end: new Date(2024, 8, 15),
			done: true,
			content: `## OVA: Componentes Web con Astro\n\n**Objetivo:** Introducir a los estudiantes en el concepto de componentes web dentro del framework Astro, explorando su creación, reutilización y aplicación en diferentes páginas web.\n\n**Nivel:** Intermedio-Avanzado\n\n**Formato:** Flipped Learning\n\n**Pre-clase:**\n\n* **Lectura:** Revisar la documentación oficial de Astro sobre componentes web: [https://astro.build/docs/guides/components/](https://astro.build/docs/guides/components/)\n* **Actividad:** Antes de la clase, crea un componente web simple en Astro que muestre un saludo personalizado. Puedes usar el siguiente código como base:\n    \`\`\`html\n    <script>\n    export default function Greeting() {\n      return <p>Hola, {name}!</p>;\n    }\n    </script>\n    \`\`\`\n    Experimenta con el componente, modificando el saludo y utilizando variables para personalizarlo.\n* **Reto:** Encuentra un ejemplo práctico de un componente web que se usa en una aplicación web real. Analiza su código y explica cómo funciona. \n\n**Durante la clase:**\n\n* **Introducción:**\n    * Comenzar con una breve revisión de los conceptos básicos de componentes web y su importancia en el desarrollo web moderno.\n    * Explicar las ventajas de usar componentes web, como la reutilización de código, la modularidad y la facilidad de mantenimiento.\n* **Creación de componentes:**\n    * Mostrar ejemplos de cómo crear componentes web en Astro, explicando las diferentes opciones de sintaxis y las características disponibles.\n    * Profundizar en el uso de props para pasar datos y funciones a los componentes.\n    * Mostrar cómo renderizar componentes condicionalmente y gestionar el estado interno.\n* **Reutilización de componentes:**\n    * Demostrar cómo importar y reutilizar componentes en diferentes páginas y secciones de la aplicación.\n    * Mostrar cómo pasar datos y funciones entre componentes.\n* **Integración de componentes con AstroDB:**\n    * Explicar cómo se pueden conectar los componentes web con la base de datos AstroDB.\n    * Mostrar ejemplos de cómo acceder a datos desde AstroDB dentro de los componentes.\n* **Práctica:**\n    * Desarrollar un ejercicio práctico donde los estudiantes creen un componente web complejo y lo integren a una aplicación web.\n    * Los estudiantes pueden elegir un componente que sea relevante para su proyecto actual o para una aplicación web específica.\n\n**Post-clase:**\n\n* **Tarea:** Investigar sobre diferentes tipos de componentes web en Astro, como los componentes de diseño, los componentes de lógica de negocio y los componentes de datos.\n* **Proyecto:** Diseñar y desarrollar un componente web para una aplicación web que estén desarrollando.\n* **Debate:** Discutir las ventajas e inconvenientes de usar componentes web en comparación con otros métodos de desarrollo web.\n\n**Recursos adicionales:**\n\n* **Documentación de Astro:** [https://astro.build/docs/](https://astro.build/docs/)\n* **Tutoriales de Astro:** [https://www.youtube.com/watch?v=F2pw1C9eKXw&list=PLoqZcxvpWzzeRwF8TEpXHtO7KYY6cNJeF](https://www.youtube.com/watch?v=F2pw1C9eKXw&list=PLoqZcxvpWzzeRwF8TEpXHtO7KYY6cNJeF)\n* **Ejemplos de código:** [https://github.com/withastro/astro/tree/main/examples](https://github.com/withastro/astro/tree/main/examples)\n* **Comunidad de Astro:** [https://astro.build/community/](https://astro.build/community/)\n\n**Ejemplo de componente web:**\n\n\`\`\`html\n<script>\nexport default function ProductCard(props) {\n  return (\n    <div class=\"card\">\n      <img src={props.image} alt={props.name} />\n      <h3>{props.name}</h3>\n      <p>\${props.price}</p>\n      <button>Añadir al carrito</button>\n    </div>\n  );\n}\n</script>\n\`\`\`\n\n**Uso del componente:**\n\n\`\`\`html\n<ProductCard image=\"https://example.com/product-image.jpg\" name=\"Camiseta\" price=\"19.99\" />\n\`\`\`\n\n**Tabla de componentes web:**\n\n| Tipo de componente | Descripción | Ejemplo |\n|---|---|---|\n| Componente de diseño | Define la apariencia y el estilo de un elemento de la interfaz de usuario. | Botón, Menú, Card |\n| Componente de lógica de negocio | Implementa la lógica de negocio de una aplicación. | Formulario, Calculadora, Carrito de compras |\n| Componente de datos | Muestra datos de una base de datos o API. | Lista de productos, Tabla de usuarios, Gráfico |\n\n**Conclusiones:**\n\nLos componentes web son una herramienta poderosa para el desarrollo web moderno, permitiendo crear aplicaciones web robustas, modulares y fáciles de mantener. Astro proporciona un marco de trabajo flexible y fácil de usar para crear componentes web que se pueden integrar a cualquier aplicación web.\n`,
			courseId,
		},
		{
			id: randomUUID(),
			title: 'Enrutamiento en Astro',
			caption:
				'Manejo de rutas en Astro para la creación de páginas y componentes dinámicos. Utilización de la configuración de enrutamiento y la creación de rutas anidadas.',
			start: new Date(2024, 8, 22),
			end: new Date(2024, 8, 22),
			done: true,
			content: `## OVA: Enrutamiento en Astro\n\n**Bienvenido a la lección sobre Enrutamiento en Astro!** En esta lección exploraremos cómo utilizar el enrutamiento en Astro para crear páginas y componentes dinámicos en tus aplicaciones web.\n\n**Nivel:** Intermedio - Avanzado\n\n**Objetivo de Aprendizaje:**  Comprender y aplicar la configuración de enrutamiento en Astro para la creación de rutas, páginas y componentes dinámicos, incluyendo rutas anidadas.\n\n**Estructura Flipped Learning:**\n\n**Antes de la Clase:**\n\n* **Revisión de Conceptos:**\n    * Asegúrate de tener un buen entendimiento de los componentes web en Astro. Si no estás familiarizado con este tema, revisa la documentación de Astro en [https://astro.build/](https://astro.build/).\n    *  Revisa los conceptos básicos de enrutamiento web. Puedes encontrar información útil en [https://en.wikipedia.org/wiki/URL_routing](https://en.wikipedia.org/wiki/URL_routing).\n\n* **Actividad Pre-Lección:**\n    * Elige un ejemplo simple de una aplicación web (como un blog o una página de productos) y trata de identificar las diferentes rutas que necesitarías para implementarla.\n\n**Durante la Clase:**\n\n* **Introducción al Enrutamiento en Astro:**\n    * Explicación detallada de cómo funciona el enrutamiento en Astro.\n    * Presentación de las diferentes opciones de configuración del enrutamiento en Astro.\n    * Demostración práctica de la creación de una ruta simple en Astro.\n\n* **Rutas Anidadas:**\n    * Explicación de cómo crear rutas anidadas en Astro.\n    * Demostración práctica de la creación de un menú de navegación con rutas anidadas.\n    * Discusión sobre la organización de tu código en función de las rutas anidadas.\n\n* **Rutas Dinámicas:**\n    * Explicación de cómo crear rutas dinámicas en Astro utilizando parámetros.\n    * Demostración práctica de la creación de una página de detalles de producto que muestre información específica de cada producto.\n    * Discusión sobre las ventajas e inconvenientes de las rutas dinámicas.\n\n**Después de la Clase:**\n\n* **Ejercicio Práctico:**\n    * Crea una aplicación web simple utilizando las herramientas aprendidas en la clase. Por ejemplo, una aplicación de lista de tareas o un blog personal.\n    * Experimenta con diferentes opciones de configuración del enrutamiento en Astro.\n    * Intenta implementar rutas anidadas y dinámicas en tu aplicación.\n\n* **Recursos Adicionales:**\n    * Revisa la documentación oficial de Astro en [https://astro.build/](https://astro.build/) para más información sobre el enrutamiento y otras funcionalidades.\n    * Explora ejemplos de código en el repositorio oficial de Astro en [https://github.com/withastro/astro](https://github.com/withastro/astro).\n\n**Ejemplos de código:**\n\n**Creación de una ruta simple:**\n\n\`\`\`javascript\n// pages/index.astro\n<h1>Bienvenido a mi página de inicio</h1>\n\`\`\`\n\n**Creación de una ruta anidada:**\n\n\`\`\`javascript\n// pages/blog/index.astro\n<h1>Artículos del blog</h1>\n\`\`\`\n\n\`\`\`javascript\n// pages/blog/[slug].astro\n<h1>{slug}</h1>\n\`\`\`\n\n**Creación de una ruta dinámica:**\n\n\`\`\`javascript\n// pages/products/[id].astro\n<h1>Producto {id}</h1>\n\`\`\`\n\n**Imágenes y Vídeos:**\n\n![Ejemplo de una ruta anidada](https://www.example.com/imagen-ruta-anidada.jpg)\n\n[![Ejemplo de una ruta dinámica](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)\n\n**Recuerda:** El enrutamiento es una parte fundamental del desarrollo web con Astro. ¡Es crucial comprender y utilizar esta herramienta para crear aplicaciones web complejas y dinámicas!\n\n**Recursos adicionales:**\n\n* [https://astro.build/docs/guides/routing](https://astro.build/docs/guides/routing)\n* [https://github.com/withastro/astro/tree/main/examples](https://github.com/withastro/astro/tree/main/examples)\n\n**¡Buen trabajo!**\n`,
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
