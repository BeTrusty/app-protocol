# BeTrusty - Next.js Application

BeTrusty es una plataforma diseñada para consolidar, verificar y portar tu reputación digital, brindando una solución segura y eficiente para demostrar tu credibilidad en distintos contextos, como alquileres y empleos.

Este proyecto está construido utilizando [Next.js](https://nextjs.org/), un framework de React para crear aplicaciones web rápidas y escalables.

---

## **Características Principales**

- **Consolidación de Reputación:** Integra datos de diferentes plataformas (Mercado Libre, GitHub, Talent Protocol) en una identidad digital única.
- **Privacidad Protegida:** Utiliza zkProofs para verificar información sensible sin exponer datos personales.
- **Firma Digital Legal:** Compatible con Autopen para generar firmas digitales válidas en varios países.
- **Portabilidad:** Tu identidad digital es portable y utilizable en cualquier plataforma.

---

## **Requisitos Previos**

Asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Opcional: [Bun](https://bun.sh/) como administrador de paquetes

---

## **Instalación del Proyecto**

### **1. Clona el repositorio**

```bash
git clone https://github.com/usuario/betrusty-nextjs.git
cd betrusty-nextjs
```

### **2. Instala las dependencias**

Usa el administrador de paquetes de tu preferencia:

```bash
npm install
# o
yarn install
# o
bun install
```

### **3. Configura las variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto y agrega las siguientes variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_PROJECT_NAME=BeTrusty
```

Asegúrate de personalizar estas variables según tu entorno.

### **4. Inicia el servidor de desarrollo**

Ejecuta el siguiente comando:

```bash
npm run dev
# o
yarn dev
# o
bun dev
```

Esto iniciará el proyecto en modo desarrollo. 

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en acción.

---

## **Estructura del Proyecto**

- **`/pages`**: Contiene las rutas de la aplicación y las API.
- **`/components`**: Componentes reutilizables.
- **`/styles`**: Archivos de estilo CSS o Tailwind.
- **`/public`**: Recursos estáticos como imágenes y fuentes.

---

## **Despliegue en Producción**

La forma más sencilla de desplegar este proyecto es utilizando [Vercel](https://vercel.com/):

1. Haz clic en el siguiente enlace para desplegar directamente:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

2. Configura las variables de entorno en el panel de Vercel.

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/deployment) para más detalles.

---

## **Recursos Adicionales**

- [Documentación de Next.js](https://nextjs.org/docs)
- [Tutorial Interactivo de Next.js](https://nextjs.org/learn)
- [Repositorio de GitHub de BeTrusty](https://github.com/usuario/betrusty-nextjs)


