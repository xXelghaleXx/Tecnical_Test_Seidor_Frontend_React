# 🎨 SWAPI FORCESEARCH - Frontend (Manual Completo)

Bienvenido. Si estás leyendo esto, es porque quieres instalar y ejecutar el Frontend de la **Prueba Técnica Seidor**.

Este documento ha sido diseñado para ser **"A prueba de errores"**. No importa si nunca has tocad una terminal o si eres un experto, aquí encontrarás **CADA PASO** detallado para que nada falle.

---

## � Índice de Contenidos

1.  [¿Qué necesitas instalar antes? (Requisitos)](#1-qué-necesitas-instalar-antes-requisitos)
2.  [Descargar el Proyecto](#2-descargar-el-proyecto)
3.  [Instalar las Librerías (Dependencias)](#3-instalar-las-librerías-dependencias)
4.  [Configuración Secreta (.env)](#4-configuración-secreta-env)
5.  [¡A Correr! (Ejecutar en tu PC)](#5-a-correr-ejecutar-en-tu-pc)
6.  [Subir a Internet (Despliegue en Vercel)](#6-subir-a-internet-despliegue-en-vercel)
7.  [¿Algo salió mal? (Solución de Problemas)](#7-algo-salió-mal-solución-de-problemas)

---

## 1. ¿Qué necesitas instalar antes? (Requisitos)

Antes de tocar el código, necesitamos preparar tu computadora.

### A. Instalar Node.js (El motor)
Node.js es lo que permite ejecutar JavaScript fuera del navegador. Sin esto, nada funciona.

1.  Ve a la página oficial: [nodejs.org](https://nodejs.org/)
2.  Descarga la versión que dice **"LTS"** (Long Term Support). Es la más estable (actualmente v20 o v22).
3.  Instálalo como cualquier programa (Next, Next, Next, Finish).

### B. Instalar Git (Para descargar el código)
1.  Ve a: [git-scm.com](https://git-scm.com/)
2.  Descarga e instala la versión para Windows.
3.  Durante la instalación, puedes dejar todas las opciones por defecto.

### C. (Opcional pero Recomendado) Visual Studio Code
Es el mejor editor para ver el código.
1.  Descárgalo aquí: [code.visualstudio.com](https://code.visualstudio.com/)

---

## 2. Descargar el Proyecto

Ahora vamos a traer el código a tu carpeta.

1.  Crea una carpeta en tu Escritorio llamada `PruebaSeidor`.
2.  Abre esa carpeta.
3.  Haz clic derecho en un espacio vacío y selecciona **"Open Git Bash here"** (si instalaste Git) o abre una terminal (CMD o PowerShell) y navega hasta ahí.
4.  Escribe el siguiente comando y presiona ENTER:

```bash
git clone https://github.com/TU_USUARIO/NOMBRE_DEL_REPO.git
```
*(Reemplaza el link con el de tu repositorio real)*

5.  Ahora verás una carpeta nueva. Entra en ella con el comando:

```bash
cd frontend
```
**¡IMPORTANTE!**: Asegúrate de estar dentro de la carpeta `frontend`. Si escribes `ls` (o `dir` en Windows) deberías ver un archivo llamado `package.json`.

---

## 3. Instalar las Librerías (Dependencias)

El código necesita muchas herramientas externas (librerías) para funcionar (React, Vite, etc.). Vamos a descargarlas automáticamente.

1.  En tu terminal (dentro de la carpeta `frontend`), escribe:

```bash
npm install
```

2.  Presiona ENTER.
3.  Verás una barra de carga y mucho texto pasando. **Espera a que termine**.
4.  Si todo sale bien, volverás a ver la línea para escribir comandos y aparecerá una carpeta llamada `node_modules` en tu proyecto.

---

## 4. Configuración Secreta (.env)

Este paso es **CRÍTICO**. La aplicación necesita saber la dirección de tu Backend (API) para funcionar.

1.  Abre la carpeta del proyecto en **Visual Studio Code**.
2.  Busca en la lista de archivos a la izquierda.
3.  Haz clic derecho en un espacio vacío de la lista de archivos y elige **"New File"** (Nuevo Archivo).
4.  Nómbralo EXACTAMENTE así (con el punto al inicio):
    `.env`
5.  Abre ese archivo `.env` y pega lo siguiente dentro:

```ini
# API Gateway para operaciones GET (people, favorites)
VITE_API_GET_URL=https://y76a850dh4.execute-api.us-east-1.amazonaws.com

# API Gateway para operaciones POST/DELETE (create/delete favorites)
VITE_API_POST_URL=https://lvryteny8c.execute-api.us-east-1.amazonaws.com
```

6.  **CAMBIA LA URL**: Borra `https://tu-api-gateway-url...` y pon la URL real que obtuviste al desplegar tu Backend en AWS (debería terminar en `.amazonaws.com` o similar, sin la barra `/` al final).

7.  Guarda el archivo (`Ctrl + S`).

---

## 5. ¡A Correr! (Ejecutar en tu PC)

¡Llegó el momento de la verdad!

1.  En la terminal, escribe:

```bash
npm run dev
```

2.  Si todo está bien, verás un mensaje verde que dice algo como:
    `Local: http://localhost:5173/`

3.  Mantén presionada la tecla `Ctrl` y haz clic en ese link, o abre tu navegador (Chrome/Edge) y escribe `http://localhost:5173`.

**¡Felicidades! Deberías ver la aplicación de Star Wars funcionando.** 🎉

---

## 6. Subir a Internet (Despliegue en Vercel)

Si quieres que todo el mundo vea tu página, sigue estos pasos para subirla a Vercel (es gratis y fácil).

1.  Ve a [vercel.com](https://vercel.com) y crea una cuenta (puedes entrar con tu cuenta de GitHub).
2.  En tu panel principal (Dashboard), haz clic en el botón blanco **"Add New..."** y elige **"Project"**.
3.  Verás una lista de tus repositorios de GitHub. Busca el de este proyecto y dale al botón azul **"Import"**.

### Configuración en Vercel (¡OJO AQUÍ!)

Verás una pantalla de configuración. Solo necesitas tocar dos cosas:

1.  **Framework Preset**: Asegúrate de que diga **Vite**. (Vercel suele adivinarlo solo).
2.  **Root Directory**: Si tu repositorio tiene una carpeta `frontend`, dale a "Edit" y selecciona esa carpeta `frontend`. Si el repositorio ES el frontend, déjalo como está (`./`).
3.  **Environment Variables** (Variables de Entorno):
    -   Haz clic para desplegar esta sección.
    -   Donde dice **Key** escribe: `VITE_API_URL`
    -   Donde dice **Value** escribe: La URL de tu API de AWS (la misma que pusiste en el `.env`).
    -   Dale a **Add**.

4.  Finalmente, haz clic en el botón grande **Deploy**.

Espera unos segundos... verás confeti 🎊 y un link a tu página en vivo.

---

## 7. ¿Algo salió mal? (Solución de Problemas)

Aquí están los errores más comunes que comete la gente (y cómo arreglarlos):

### ❌ Error: "npm command not found"
**Solución**: No instalaste Node.js (Paso 1). Instálalo y reinicia tu terminal.

### ❌ Error: "vite is not recognized"
**Solución**: Te saltaste el paso `npm install` (Paso 3). Ejecútalo.

### ❌ La página carga pero no veo personajes (pantalla vacía o loading infinito)
**Solución**:
1.  Tu variable `VITE_API_URL` está mal.
2.  Abre la consola del navegador (F12 o Clic Derecho > Inspeccionar > Consola).
3.  Si ves errores rojos, lee el mensaje.
4.  Si dice `404`, la URL de la API está mal escrita.
5.  Si dice `Network Error`, tu backend de AWS puede estar caído o la URL es incorrecta.

### ❌ Error 404 al recargar la página en Vercel
**Solución**: Vercel necesita saber que esto es una aplicación de una sola página.
1.  Crea un archivo llamado `vercel.json` en la carpeta `frontend`.
2.  Pega esto dentro:
    ```json
    {
      "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
    }
    ```
3.  Sube los cambios a GitHub (`git push`).

---

**Desarrollado con ❤️ para la Prueba Técnica Seidor 2026**
