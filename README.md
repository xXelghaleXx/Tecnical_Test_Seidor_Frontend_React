# ForceSearch - Star Wars Character Explorer

Aplicación web para explorar personajes de Star Wars con sistema de favoritos. Construida con React, TypeScript y Vite.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene incluido con Node.js)
- **Backend API** corriendo en `http://localhost:3000`

## 🚀 Instalación

### 1. Clonar o descargar el proyecto

```bash
cd frontend
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- React 19.2.0
- TypeScript
- Vite
- Axios (para peticiones HTTP)
- Lucide React (iconos)

### 3. Verificar configuración de la API

El frontend está configurado para conectarse al backend en `http://localhost:3000/api`. 

Verifica que el archivo `src/api/axios.ts` tenga la URL correcta:

```typescript
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});
```

## 🔌 Conexión con el Backend

### Arquitectura de Conexión

El frontend se comunica con el backend a través de los siguientes endpoints:

#### 1. **GET /api/people** - Obtener personajes
- **Parámetros de consulta:**
  - `page`: Número de página (ej: `?page=1`)
  - `search`: Búsqueda por nombre (ej: `?search=luke`)
- **Uso en el código:** `src/hooks/usePeople.ts` líneas 29 y 55

#### 2. **GET /api/favorites** - Obtener favoritos
- **Parámetros de consulta:**
  - `page`: Número de página
  - `pageSize`: Elementos por página (fijo en 5)
- **Uso en el código:** `src/hooks/usePeople.ts` línea 75

#### 3. **POST /api/favorites** - Agregar favorito
- **Body:** Objeto Character completo
- **Uso en el código:** `src/hooks/usePeople.ts` línea 105

#### 4. **DELETE /api/favorites/:id** - Eliminar favorito
- **Parámetro de ruta:** ID del personaje
- **Uso en el código:** `src/hooks/usePeople.ts` línea 134

### Requisitos del Backend

El backend debe:

1. **Estar corriendo en el puerto 3000**
2. **Tener CORS habilitado** para permitir peticiones desde `http://localhost:5173`
3. **Tener una base de datos MySQL configurada** con la tabla de favoritos
4. **Responder con el formato esperado:**

```typescript
// GET /api/people
{
  total: number,
  next: string | null,
  previous: string | null,
  characters: Character[]
}

// GET /api/favorites
{
  page: number,
  pageSize: number,
  total: number,
  data: Character[]
}
```

### Configuración de la Base de Datos

El backend necesita una tabla `favorites` en MySQL con la siguiente estructura:

```sql
CREATE TABLE favorites (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  height VARCHAR(50),
  mass VARCHAR(50),
  hair_color VARCHAR(50),
  skin_color VARCHAR(50),
  eye_color VARCHAR(50),
  birth_year VARCHAR(50),
  gender VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Nota:** El backend debe estar configurado con las credenciales correctas de MySQL en su archivo `.env`

## ▶️ Ejecutar la Aplicación

### 1. Iniciar el backend

Primero, asegúrate de que el backend esté corriendo:

```bash
# En el directorio del backend
npm start
# o
npm run dev
```

Deberías ver un mensaje indicando que el servidor está corriendo en el puerto 3000.

### 2. Iniciar el frontend

En una terminal separada, ejecuta:

```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:5173`

## 🎯 Funcionalidades

- ✅ **Explorar todos los personajes** con paginación (82 personajes en total)
- ✅ **Buscar personajes** por nombre
- ✅ **Agregar/eliminar favoritos** con persistencia en base de datos
- ✅ **Paginación de favoritos** (5 por página)
- ✅ **Interfaz responsiva** con tema Star Wars
- ✅ **Manejo de errores** con notificaciones visuales

## 🛠️ Scripts Disponibles

```bash
# Modo desarrollo (con hot reload)
npm run dev

# Compilar para producción
npm run build

# Vista previa de la build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── api/
│   │   └── axios.ts          # Configuración de Axios
│   ├── components/
│   │   ├── CharacterCard.tsx # Tarjeta de personaje
│   │   └── Pagination.tsx    # Componente de paginación
│   ├── hooks/
│   │   └── usePeople.ts      # Hook personalizado (lógica principal)
│   ├── types/
│   │   └── index.ts          # Tipos TypeScript
│   ├── App.tsx               # Componente principal
│   └── main.tsx              # Punto de entrada
├── package.json
└── vite.config.ts
```

## 🔧 Solución de Problemas

### Error: "Error al conectar con el servidor"

**Causa:** El backend no está corriendo o no es accesible.

**Solución:**
1. Verifica que el backend esté corriendo en `http://localhost:3000`
2. Comprueba que no haya errores en la consola del backend
3. Verifica que el CORS esté habilitado en el backend

### Error: "Error al cargar los personajes"

**Causa:** Problema con la API de SWAPI o con el backend.

**Solución:**
1. Verifica la conexión a internet
2. Comprueba los logs del backend
3. Verifica que el backend pueda conectarse a SWAPI

### Error: "Error al conectar con la base de datos"

**Causa:** El backend no puede conectarse a MySQL.

**Solución:**
1. Verifica que MySQL esté corriendo
2. Comprueba las credenciales en el archivo `.env` del backend
3. Verifica que la tabla `favorites` exista en la base de datos

## 🌐 Puertos Utilizados

- **Frontend:** `http://localhost:5173` (Vite dev server)
- **Backend:** `http://localhost:3000` (API REST)
- **MySQL:** `localhost:3306` (Base de datos)

## 📝 Notas Técnicas

- El frontend utiliza **React 19** con el nuevo compilador de React
- **TypeScript** para type safety
- **Vite** para un desarrollo rápido con HMR
- **Axios** para peticiones HTTP con interceptores
- **Custom Hooks** para separar la lógica de negocio de la UI
- **CSS Modules** para estilos encapsulados

## 👨‍💻 Desarrollo

Para modificar la URL del backend, edita el archivo `src/api/axios.ts`:

```typescript
const api = axios.create({
  baseURL: 'TU_URL_AQUI', // Cambia esto según tu configuración
});
```

---

**Desarrollado con ❤️ para la Prueba Técnica Seidor 2026 v1.0**
