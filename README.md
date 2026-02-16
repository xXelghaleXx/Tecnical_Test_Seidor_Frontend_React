# SEIDOR SWAPI - Frontend React Application
⭐ Aplicación Frontend para consumir SWAPI (Star Wars API) ⭐

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

## 📋 Tabla de Contenidos
1.  [Descripción](#-descripción)
2.  [Características](#-características)
3.  [Tecnologías](#-tecnologías)
4.  [Requisitos Previos](#-requisitos-previos)
5.  [Instalación](#-instalación)
6.  [Configuración](#-configuración)
7.  [Ejecución](#-ejecución)
8.  [Testing](#-testing)
9.  [Estructura del Proyecto](#-estructura-del-proyecto)
10. [Funcionalidades Principales](#-funcionalidades-principales)
11. [Decisiones Técnicas](#-decisiones-técnicas)
12. [Deploy](#-deploy)

---

## 🚀 Descripción
Esta aplicación **React + TypeScript** permite explorar el universo de Star Wars mediante el consumo de una arquitectura de microservicios en AWS. Los usuarios pueden buscar personajes, visualizar información detallada y gestionar su propia lista de favoritos persistente.

La aplicación destaca por su diseño moderno "Galáctico", su rendimiento optimizado con Vite y su robustez gracias al tipado estático.

---

## ✨ Características
**Funcionalidades implementadas:**

### 🔍 Búsqueda Avanzada
-   **Búsqueda Global**: Encuentra personajes por nombre instantáneamente.
-   **Integración SWAPI**: Consume datos reales de la API de Star Wars.
-   **Filtrado Inteligente**: Los personajes favoritos se gestionan visualmente.

### ⭐ Gestión de Favoritos
-   **Persistencia**: Guardado en base de datos MySQL (vía API Backend).
-   **CRUD Completo**: Agregar y Eliminar favoritos con feedback inmediato.
-   **Vista Dedicada**: Sección exclusiva para gestionar tus personajes preferidos.

### 🎨 UI/UX Moderna
-   **Diseño Responsivo**: Adaptado perfectamente a móviles, tablets y desktop.
-   **Tema Oscuro**: Estética inmersiva inspirada en Star Wars.
-   **Feedback Visual**: Notificaciones Toast y estados de carga (Spinners).

---

## 🛠 Tecnologías
-   **React 19**: Biblioteca principal de UI (aprovechando las últimas mejoras).
-   **TypeScript**: Tipado estático para asegurar código libre de errores.
-   **Vite**: Build tool de última generación (Hot Module Replacement instantáneo).
-   **Axios**: Cliente HTTP robusto con interceptores para manejo de errores.
-   **CSS Modules**: Estilos encapsulados para evitar colisiones.
-   **ESLint**: Linter para mantener la calidad del código.

---

## 📦 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:

-   **Node.js** >= 18.x
-   **npm** >= 9.x
-   **Git**

---

## 💻 Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPO>
    cd frontend
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

---

## ⚙️ Configuración

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto. Este paso es **CRÍTICO** para conectar con los microservicios.

```bash
cp .env.example .env
# O crea uno nuevo
```

**MUESTRA DEL ARCHIVO `.env`:**

```ini
# API Gateway para obtener personajes y favoritos (GET)
VITE_API_GET_URL=https://y76a850dh4.execute-api.us-east-1.amazonaws.com

# API Gateway para crear y eliminar favoritos (POST/DELETE)
VITE_API_POST_URL=https://lvryteny8c.execute-api.us-east-1.amazonaws.com
```

> **Nota**: Estas URLs corresponden al despliegue actual en AWS. Si despliegas tu propio backend, reemplázalas.

---

## 🚀 Ejecución

### Modo Desarrollo
Inicia el servidor local con recarga rápida:
```bash
npm run dev
```
📍 Disponible en: `http://localhost:5173`

### Build para Producción
Genera y optimiza los archivos para despliegue:
```bash
npm run build
```
Los archivos se generarán en la carpeta `dist/`.

### Preview del Build
Prueba localmente la versión de producción:
```bash
npm run preview
```

---

## 🧪 Testing

### Evidencia de Validación
La aplicación ha sido validada mediante procesos de compilación y análisis estático.

**Estado del Build (`npm run build`):**
```bash
vite v6.0.0 building for production...
✓ 1767 modules transformed.
dist/index.html                   0.56 kB
dist/assets/index.css             16.55 kB
dist/assets/index.js              243.89 kB
✓ built in 1.48s
```

**Ejecutar Linter:**
```bash
npm run lint
```

---

## 📁 Estructura del Proyecto

```text
frontend/
├── src/
│   ├── api/                # 🌐 Capa de red (Axios)
│   ├── components/         # 🧩 Componentes UI Reutilizables
│   │   ├── CharacterCard.tsx
│   │   ├── Pagination.tsx
│   │   └── ...
│   ├── hooks/              # 🎣 Custom Hooks (Lógica de Negocio)
│   │   ├── usePeople.ts    # Lógica principal de personajes
│   ├── types/              # 📝 Definiciones TypeScript
│   │   └── index.ts
│   ├── App.tsx             # Componente Raíz
│   └── main.tsx            # Punto de entrada
├── public/                 # 🖼️ Assets estáticos
├── .env                    # 🔐 Variables de entorno
└── vite.config.ts          # ⚡ Configuración Vite
```

---

## 🎯 Funcionalidades Principales

1.  **Exploración de Personajes**: Consumo paginado de la API, mostrando tarjetas con detalles clave.
2.  **Búsqueda Instantánea**: Filtrado por nombre que consulta directamente al backend.
3.  **Persistencia de Favoritos**: Al dar "Like", el personaje se guarda permanentemente en la base de datos MySQL.

---

## 🧠 Decisiones Técnicas

### ¿Por qué Vite en lugar de CRA?
-   **Rendimiento**: Vite utiliza ES Modules nativos en desarrollo, lo que elimina los tiempos de espera de compilación.
-   **Build Optimizado**: Usa Rollup para producción, generando bundles más pequeños y eficientes.

### Arquitectura de Hooks
Se decidió extraer la lógica a **Custom Hooks** (`usePeople`) para:
-   **Separación de Intereses**: La UI no conoce la lógica de la API ni el manejo de estados complejos.
-   **Reutilización**: Facilita compartir lógica entre componentes si la app crece.

### División de Servicios API
Se configuraron dos URLs base diferentes (`VITE_API_GET_URL` y `VITE_API_POST_URL`) en lugar de una sola.
-   **Justificación**: Esto permite que el Frontend consuma microservicios desplegados independientemente (Pattern: Micro Frontends / Microservices consumtion). Si el servicio de lectura escala diferente al de escritura, el frontend ya está listo para soportar dominios distintos.

---

## 🌐 Deploy

### Opción 1: Vercel (Recomendado)
Este proyecto está optimizado para Vercel.
1.  Importar proyecto desde GitHub.
2.  Configurar **Framework Preset** como `Vite`.
3.  Agregar las variables de entorno (`VITE_API_GET_URL`, etc.).
4.  Deploy.

### Opción 2: GitHub Pages
Configurado mediante GitHub Actions.
1.  Ajustar `base` en `vite.config.ts`.
2.  Activar GitHub Pages en el repositorio (Source: GitHub Actions).

---

## 🐛 Solución de Problemas

### Error 404 al recargar (Vercel)
-   **Causa**: SPA Routing.
-   **Solución**: Agregar `vercel.json` con reglas de reescritura.

### CORS Error
-   **Causa**: El backend no permite el origen.
-   **Solución**: Verificar configuración `serverless.yml` en el backend.

---

**Desarrollado por Adrian Nuñuvero Ochoa con cariño para la Prueba Técnica Seidor 2026**
