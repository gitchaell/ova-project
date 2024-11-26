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
			content: `# Título de la lección: Introducción a Astro\n\n## Introducción\n\n¡Bienvenidos a la introducción a Astro!  En este módulo, exploraremos este innovador framework web que te permitirá construir sitios web rápidos, modernos y orientados al contenido. Astro se destaca por su enfoque en la **hidratación parcial**, lo que significa que solo carga el JavaScript absolutamente necesario en el navegador, resultando en un rendimiento excepcional. Aprenderemos los conceptos fundamentales de Astro, su arquitectura y las ventajas que ofrece para el desarrollo web moderno.  Prepárate para descubrir una nueva forma de construir la web.\n\n## Actividades antes de la clase\n\nPara aprovechar al máximo esta lección, te recomiendo realizar las siguientes actividades:\n\n- **Lectura introductoria:** Lee el artículo "¿Qué es Astro? Introducción al Popular Generador de Sitios Estáticos" de Kinsta: [https://kinsta.com/es/blog/astro-js/](https://kinsta.com/es/blog/astro-js/).  Este artículo te proporcionará una visión general de Astro, sus características principales y sus beneficios.\n- **Instalación y configuración:** Sigue la guía de inicio rápido en la documentación oficial de Astro para instalar y configurar un proyecto básico: [https://docs.astro.build/es/getting-started/](https://docs.astro.build/es/getting-started/).  Familiarízate con la estructura de un proyecto Astro.\n- **Video introductorio (opcional):**  Mira el video "ASTRO - El framework web del que TODOS están HABLANDO": [https://www.youtube.com/watch?v=GrYTrlKv_ss](https://www.youtube.com/watch?v=GrYTrlKv_ss).  Este video te ofrecerá una perspectiva visual de las capacidades de Astro.\n\n\n## Actividades durante la clase\n\nDurante la clase, profundizaremos en los siguientes temas:\n\n- **Arquitectura de Astro:** Analizaremos la arquitectura basada en **Islands Architecture**, que permite la integración de componentes de diferentes frameworks (React, Vue, Svelte, etc.)  y la optimización del rendimiento a través de la hidratación parcial.\n    - **Ejercicio práctico:** Crearemos un proyecto Astro simple e integraremos un componente React.\n- **Componentes Web en Astro:** Aprenderemos a crear componentes reutilizables en Astro, utilizando la sintaxis \`.astro\`.  Exploraremos la gestión de estilos y la interacción con JavaScript.\n    - **Ejercicio práctico:** Desarrollaremos un componente de tarjeta de producto con estilos y funcionalidad básica.\n- **Enrutamiento en Astro:**  Estudiaremos el sistema de enrutamiento basado en archivos de Astro, que simplifica la navegación y la organización del sitio web.\n    - **Ejercicio práctico:** Crearemos diferentes páginas y configuraremos la navegación entre ellas.\n- **End-points y Actions en Astro:** Descubriremos cómo crear APIs y gestionar la lógica del lado del servidor con los End-points y las Actions de Astro.\n    - **Ejercicio práctico:**  Implementaremos un end-point para obtener datos de una API externa.\n- **AstroDB (opcional):** Si el tiempo lo permite, introduciremos AstroDB, una base de datos integrada en Astro para proyectos pequeños.\n    - **Ejercicio práctico:** Crearemos una base de datos simple y la utilizaremos para almacenar datos de nuestros componentes.\n\n**Debate en clase:** Analizaremos las ventajas y desventajas de Astro en comparación con otros frameworks como Next.js y Remix.\n\n## Actividades después de la clase\n\nPara consolidar los conocimientos adquiridos, te propongo las siguientes actividades:\n\n- **Proyecto individual:**  Desarrolla un pequeño sitio web con Astro, utilizando los conceptos aprendidos en la clase.  Puedes crear un blog personal, un portafolio o una landing page.\n- **Investigación:** Explora la documentación oficial de Astro: [https://docs.astro.build/es/](https://docs.astro.build/es/) para profundizar en temas específicos como la optimización del rendimiento, la integración con otras herramientas y las opciones de despliegue.\n- **Recursos adicionales:**\n    - Revisa el video de Fernando Herrera "[S1/L01] Astro: framework para webs orientadas a contenido": [https://www.youtube.com/watch?v=yrFarJg7CyA](https://www.youtube.com/watch?v=yrFarJg7CyA). Este video te ofrece una introducción detallada a Astro desde la perspectiva de un desarrollador experimentado.\n    - Lee "Por qué Astro?" en la documentación oficial: [https://docs.astro.build/es/concepts/why-astro/](https://docs.astro.build/es/concepts/why-astro/) para comprender las motivaciones detrás de este framework.\n- **Preparación para la próxima clase:** Investigar sobre frameworks de UI que se integran con Astro, como React, Svelte y Vue.  Considera las ventajas y desventajas de cada uno para preparar un debate en la siguiente sesión.\n\n**Foro de discusión:** Participa en el foro del curso para compartir tus dudas,  experiencias y  proyectos con tus compañeros.\n\n\nEste esquema de lección está diseñado para ser flexible y adaptable a las necesidades de tus estudiantes.  Recuerda fomentar la participación activa y la experimentación para un aprendizaje más efectivo.\n\n\n## Enlaces de referencia\n\n### Introducción a Astro, el framework web full-stack de moda ...\n[![Introducción a Astro, el framework web full-stack de moda ...](https://adictosaltrabajo.com/wp-content/uploads/2024/03/cover_post_astro.png)](https://adictosaltrabajo.com/2024/03/22/introduccion-a-astro-el-framework-web-full-stack-de-moda/)\n\n### Qué es Astro? Introducción al Popular Generador de Sitios ...\n[![Qué es Astro? Introducción al Popular Generador de Sitios ...](https://kinsta.com/wp-content/uploads/2023/05/astro-logo.png)](https://kinsta.com/es/blog/astro-js/)\n\n### Qué es Astro? Introducción al Popular Generador de Sitios ...\n[![Qué es Astro? Introducción al Popular Generador de Sitios ...](https://kinsta.com/wp-content/uploads/2023/05/kinsta-astro-starter-repo.png)](https://kinsta.com/es/blog/astro-js/)\n\n### ASTRO - El framework web del que TODOS están HABLANDO\n[![ASTRO - El framework web del que TODOS están HABLANDO](https://i.ytimg.com/vi/GrYTrlKv_ss/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDW7dGx_bcDCzp8AwyExXTZdYEFkw)](https://www.youtube.com/watch?v=GrYTrlKv_ss)\n\n### Introducción a Astro nuevo framework de #javascript\n[![Introducción a Astro nuevo framework de #javascript](https://i.ytimg.com/vi/KHhFUbhSveI/maxresdefault.jpg)](https://www.youtube.com/watch?v=KHhFUbhSveI)\n\n### Introducción a Astro - El framework capaz de hacerlo casi todo ...\n[![Introducción a Astro - El framework capaz de hacerlo casi todo ...](https://i.ytimg.com/vi/sadHwaOVmmA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBiOlBMHeqq867jsjfRXYQfb7tITw)](https://www.youtube.com/watch?v=sadHwaOVmmA)\n\n### ASTRO: Cómo crear una WEB DESDE CERO (para ... - MoureDev by Brais Moure\n[![ASTRO: Cómo crear una WEB DESDE CERO (para ... - MoureDev by Brais Moure](https://i.ytimg.com/vi/Qe7MytTo7Vg/mqdefault.jpg?sqp=-oaymwEFCJQBEFM&rs=AMzJL3lxqKgfdlobMDiXYyIAJd1hinrQiA)](https://www.youtube.com/watch?v=Qe7MytTo7Vg)\n\n### Introducción a #Astro build framework - Programación en español\n[![Introducción a #Astro build framework - Programación en español](https://i.ytimg.com/vi/iY3hp00u7tI/mqdefault.jpg?sqp=-oaymwEFCJQBEFM&rs=AMzJL3mBq_a7Z3hZB_e7T9HtXIK3Iz5kNw)](https://www.youtube.com/watch?v=iY3hp00u7tI)\n\n### [S2/L00] Astro: framework para webs orientadas a contenido ... - Fernando Herrera\n[![[S2/L00] Astro: framework para webs orientadas a contenido ... - Fernando Herrera](https://i.ytimg.com/vi/okbu_7hIWgU/mqdefault.jpg?sqp=-oaymwEFCJQBEFM&rs=AMzJL3nmoKdjGxSoKRmyG9neoT__gsHR0w)](https://www.youtube.com/watch?v=okbu_7hIWgU)\n\n### Introducción a Astro nuevo framework de #javascript - ProCode Tv\n[![Introducción a Astro nuevo framework de #javascript - ProCode Tv](https://i.ytimg.com/vi/KHhFUbhSveI/mqdefault.jpg?sqp=-oaymwEFCJQBEFM&rs=AMzJL3lwbRYHuD1hsOmkWBx6Qt4Sa7OMOA)](https://www.youtube.com/watch?v=KHhFUbhSveI)\n\n### [S1/L01] Astro: framework para webs orientadas a contenido ... - Fernando Herrera\n[![[S1/L01] Astro: framework para webs orientadas a contenido ... - Fernando Herrera](https://i.ytimg.com/vi/yrFarJg7CyA/mqdefault.jpg?sqp=-oaymwEFCJQBEFM&rs=AMzJL3k_02CIFwVr0cV4q4OAGEcyqnc8rA)](https://www.youtube.com/watch?v=yrFarJg7CyA)\n\n### Astro: El framework para sitios web orientados al contenido ... - Fernando Herrera\n[![Astro: El framework para sitios web orientados al contenido ... - Fernando Herrera](https://i.ytimg.com/vi/7kaT6IP8lbo/mqdefault.jpg?sqp=-oaymwEFCJQBEFM&rs=AMzJL3kmKLTRilGsqpVDu6b545xsWnqyuQ)](https://www.youtube.com/watch?v=7kaT6IP8lbo)\n\n\n\n`,
			image:
				'https://ccrewts3k4o0l1px.public.blob.vercel-storage.com/image-vCAjevHQClmv0ECjqxwp7w6SYZzL0Z.png',
			videoId:
				'69c4077a1906a6b604ba4563bbcaa9620585c3815cf36a1eba88653b3993120d',
			video:
				'https://ccrewts3k4o0l1px.public.blob.vercel-storage.com/video-WlJilnGBf70j5VURHLKW5Amw4K2WUh.mp4',
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
