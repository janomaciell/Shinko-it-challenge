# Sistema de Gestión de Notas

Hola Diego y Gustavo,

Este es el proyecto fullstack que desarrollé para la preselección de Shinko IT. Se trata de un sistema completo de gestión de notas de clase con una arquitectura moderna, escalable y bien estructurada.

## Descripción del Proyecto

Sistema web fullstack que permite a los usuarios crear, editar, visualizar y eliminar notas de clase. La aplicación cuenta con una interfaz moderna y responsiva, una API RESTful robusta y una base de datos en Supabase.

## Características Principales

- CRUD completo de notas (Crear, Leer, Actualizar, Eliminar)
- Interfaz moderna con Tailwind CSS y diseño responsivo
- Estado global gestionado con Pinia
- Rendimiento optimizado con Nuxt 3
- Validación tanto en frontend como backend
- Diseño adaptable a todos los dispositivos
- Animaciones y transiciones suaves
- Sistema de alertas para feedback al usuario
- Formato de fechas relativo (hace X horas/días)

## Stack Tecnológico

### Frontend

- Nuxt 3 (Framework Vue.js con SSR/SSG)
- Vue 3
- TypeScript
- Pinia (Gestión de estado)
- Tailwind CSS
- Composables para lógica reutilizable

### Backend

- Node.js
- Express
- TypeScript
- Supabase (PostgreSQL como servicio)
- CORS configurado para comunicación con frontend

### Infraestructura

- Vercel: Deploy del frontend
- Render: Deploy del backend
- Supabase: Base de datos y autenticación

## Estructura del Proyecto

```
Shinko-it-challenge/
├── frontend/                 # Aplicación Nuxt 3
│   ├── components/
│   ├── composables/
│   ├── pages/
│   ├── stores/
│   ├── types/
│   ├── assets/
│   └── nuxt.config.ts
│
├── backend/                  # API Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── lib/
│   │   ├── utils/
│   │   ├── config/
│   │   ├── app.ts
│   │   └── server.ts
│   └── tsconfig.json
│
└── README.md
```

## Instalación y Ejecución

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn
- Cuenta de Supabase

### 1. Clonar el repositorio

```bash
git clone https://github.com/janomaciell/Shinko-it-challenge.git
cd Shinko-it-challenge
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend/`:

```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
SUPABASE_URL=tu_url_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_NOTES_TABLE=notes
```

### 3. Configurar Supabase

1. Crear un proyecto en Supabase
2. Crear una tabla `notes` con la siguiente estructura:

```sql
CREATE TABLE notes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Configurar las políticas RLS (Row Level Security) según tus necesidades.

### 4. Ejecutar el Backend

```bash
npm run dev
```

El backend estará disponible en `http://localhost:3001`

### 5. Configurar el Frontend

```bash
cd ../frontend
npm install
```

Crear archivo `.env` en la carpeta `frontend/` (opcional):

```env
NUXT_PUBLIC_API_BASE=http://localhost:3001/api
```

### 6. Ejecutar el Frontend

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

## Deploy

### Frontend (Vercel)

Configuración recomendada:

- Build Command: `npm run build`
- Output Directory: `.output/public`
- Framework: Nuxt.js

### Backend (Render)

Configuración recomendada:

- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Root Directory: `backend`

Variables de entorno necesarias:

- `NODE_ENV=production`
- `PORT` (asignado por Render)
- `CORS_ORIGIN` (URL del frontend)
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`
- `SUPABASE_NOTES_TABLE=notes`

## API Endpoints

### Notas

- `GET /api/notes` - Obtener todas las notas
- `GET /api/notes/:id` - Obtener una nota por ID
- `POST /api/notes` - Crear una nueva nota
- `PUT /api/notes/:id` - Actualizar una nota
- `DELETE /api/notes/:id` - Eliminar una nota
- `GET /api/health` - Health check del servidor


## Características de la Interfaz

- Diseño moderno con Tailwind CSS
- Componentes modulares y reutilizables
- Estados de carga y vacíos claros
- Modales para crear, editar y visualizar notas
- Alertas de éxito y error
- Diseño responsive para móvil, tablet y escritorio

## Validaciones

### Frontend

- Título: mínimo 3 caracteres, máximo 100
- Contenido: mínimo 1 carácter, máximo 5000
- Validación en tiempo real con feedback visual

### Backend

- Validación de tipos y longitudes
- Sanitización de datos
- Manejo de errores robusto

## Consideraciones Técnicas

- Arquitectura limpia (controllers, services, models)
- TypeScript con tipado estático en todo el proyecto
- Manejo centralizado de errores
- CORS configurado correctamente
- Sistema de logs para debugging
- Validación en múltiples capas
- Optimizaciones: code splitting, lazy loading en Nuxt

## Notas Adicionales

- El proyecto está completamente funcional y listo para producción
- Todo el código y los comentarios están en español
- Sigue buenas prácticas y una estructura modular clara

## Autor

Desarrollado por Jano Maciel para la preselección de Shinko IT.
