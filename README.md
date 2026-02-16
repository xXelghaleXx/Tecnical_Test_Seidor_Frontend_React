# 🎨 Star Wars Enterprise Explorer - Frontend

Bienvenido al frontend de la Prueba Técnica Seidor. Una aplicación moderna, responsive y estéticamente atractiva desarrollada con **React 19**, **TypeScript** y **Vite**, desplegada en **Vercel** y alojada también en **GitHub Pages**.

## 🌟 Características Principales

-   **Exploración Infinita**: Navegación de personajes de Star Wars paginada.
-   **Búsqueda en Tiempo Real**: Encuentra personajes por nombre instantáneamente.
-   **Gestión de Favoritos Persistente**: Agrega o elimina favoritos; los cambios se guardan en tu base de datos MySQL.
-   **Diseño Responsivo**: Adaptado a móviles y escritorio con un tema oscuro "Galáctico" personalizado.
-   **Feedback Visual**: Notificaciones Toast para acciones de éxito o error.

---

## � Estructura del Proyecto

El código está organizado siguiendo las mejores prácticas de React (Arquitectura basada en dominio y features):

```text
frontend/
├── src/
│   ├── api/                # 🌐 Configuración de Axios
│   │   └── axios.ts        # Instancia base con Interceptores
│   ├── components/         # 🧩 Componentes UI Reutilizables
│   │   ├── CharacterCard.tsx  # Tarjeta de presentación de personaje
│   │   ├── Pagination.tsx     # Controles de navegación
│   │   └── Header.tsx         # Barra de navegación superior
│   ├── hooks/              # 🎣 Custom Hooks (Lógica de Negocio)
│   │   └── usePeople.ts    # Hook masivo: Maneja búsqueda, paginación y favoritos
│   ├── types/              # � Interfaces TypeScript (Modelos)
│   │   └── index.ts        # Definición de 'Character', 'APIResponse', etc.
│   ├── App.tsx             # Componente Raíz
│   └── main.tsx            # Punto de entrada de Vite
├── public/                 # 🖼️ Assets estáticos (imágenes, favicon)
├── .env                    # 🔐 Variables de entorno (URLs de API)
├── vite.config.ts          # ⚡ Configuración de compilación Vite
└── package.json            # 📦 Dependencias
```

---

## 🚀 Guía de Instalación y Desarrollo Local

### 1. Clonar e Instalar
```bash
cd frontend
npm install
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz de la carpeta `frontend`. Debes definir dónde está alojado tu backend.

**Archivo: `.env`**
```ini
# URL de tu API Gateway en AWS (Backend GET/POST)
# Si tus lambdas están en dominios diferentes, usa la base común o configura proxies
VITE_API_URL=https://tu-api-id.execute-api.us-east-1.amazonaws.com
```

### 3. Ejecutar en Modo Desarrollo
Arranca el servidor local ultrarrápido con Vite:

```bash
npm run dev
```
Accede a **`http://localhost:5173`** en tu navegador.

---

## ☁️ Guía de Despliegue en Vercel (Recomendado)

Vercel es la plataforma ideal para desplegar proyectos Vite.

1.  **Sube tu código a GitHub/GitLab**.
2.  Ve a [Vercel](https://vercel.com) e inicia sesión.
3.  Haz clic en **Import Project** y selecciona tu repositorio.
4.  **Configuración de Build:**
    -   **Framework Preset:** Vite (Detectado automáticamente).
    -   **Root Directory:** `frontend` (¡Importante si tu repo es monorepo!).
5.  **Environment Variables:**
    -   Añade `VITE_API_URL` con la URL de tu backend en AWS.
6.  Haz clic en **Deploy**.

---

## 🔧 Solución de Problemas (Troubleshooting)

### La página carga pero no muestra personajes
-   **Causa:** Probablemente el backend no es accesible o la URL en `.env` está mal.
-   **Solución:** Abre las herramientas de desarrollador (F12) > Pestaña **Network** y recarga. Busca la petición en rojo. Si dice `CORS Error`, verifica el backend. Si dice `404`, la URL base está mal.

### Los favoritos no se guardan
-   **Causa:** El endpoint POST no está funcionando correctamente.
-   **Solución:** Verifica que tu base de datos tenga la tabla creada (`/api/migrate` en el backend POST).

### Error 404 al recargar página en GitHub Pages
-   **Causa:** GitHub Pages es estático y no maneja rutas SPA (Single Page Application) por defecto.
-   **Solución:** Este proyecto usa `HashRouter` o configuración especial en `vite.config.ts` (base path) para mitigar esto. Asegúrate de que `base` en `vite.config.ts` coincida con el nombre de tu repositorio.

---

## 📦 Scripts Disponibles

| Script | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local. |
| `npm run build` | Compila TypeScript y genera los archivos estáticos en `/dist`. |
| `npm run preview` | Sirve la carpeta `/dist` localmente para probar la build final. |
| `npm run lint` | Ejecuta ESLint para asegurar la calidad del código. |

---

**Desarrollado con ❤️ para la Prueba Técnica Seidor 2026**
