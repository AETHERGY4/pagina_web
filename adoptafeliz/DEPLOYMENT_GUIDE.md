# 🐾 Guía de Despliegue en Render (https://dashboard.render.com/)

Esta guía contiene los pasos exactos para poner en línea tu proyecto **AdoptaFeliz** en **Render.com** de forma gratuita con certificado SSL automático (HTTPS), base de datos y backend Node.js + Express.

---

## ⚡ Resumen Rápido de Configuración en Render

| Campo en Render | Valor a Colocar |
|---|---|
| **Service Type** | **Web Service** |
| **Name** | `adoptafeliz-web` |
| **Region** | `Oregon (US West)` o `Frankfurt (EU)` |
| **Branch** | `main` |
| **Root Directory** | *(Dejar en blanco)* |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` ($0/mes) |

---

## 📋 Pasos Detallados para Desplegar desde https://dashboard.render.com/

### Paso 1: Subir tu Código a GitHub
Render se conecta directamente a tus repositorios de GitHub o GitLab para compilar y desplegar automáticamente cada vez que hagas cambios.

1. Abre tu terminal en tu computadora dentro de la carpeta del proyecto.
2. Ejecuta los siguientes comandos:
   ```bash
   git init
   git add .
   git commit -m "AdoptaFeliz listo para Render"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/adoptafeliz.git
   git push -u origin main
   ```

---

### Paso 2: Crear el Web Service en Render
1. Ve a **[https://dashboard.render.com/](https://dashboard.render.com/)** e inicia sesión.
2. Haz clic en el botón superior derecho **"New +"** y selecciona **"Web Service"**.
3. Selecciona **"Build and deploy from a Git repository"** y presiona **Next**.
4. Conecta tu cuenta de GitHub (si aún no lo has hecho) y busca tu repositorio `adoptafeliz`.
5. Haz clic en **"Connect"**.

---

### Paso 3: Rellenar la Configuración del Servicio
En el formulario que aparece en Render, ingresa:
- **Name:** `adoptafeliz-web`
- **Region:** Selecciona la más cercana (por ejemplo `Oregon (US West)`).
- **Branch:** `main`
- **Runtime:** `Node`
- **Build Command:**
  ```bash
  npm install && npm run build
  ```
- **Start Command:**
  ```bash
  npm start
  ```
- **Plan:** `Free`

---

### Paso 4: Configurar Variables de Entorno en Render
En la misma página, baja hasta la sección **"Environment Variables"** y agrega:
- **Key:** `NODE_ENV` ➔ **Value:** `production`
- **Key:** `PORT` ➔ **Value:** `10000`

#### ¿Quieres conectar una base de datos MySQL externa en la nube?
Si deseas conectar un servidor MySQL (por ejemplo de **Aiven**, **Clever Cloud**, **Railway** o **PlanetScale**), agrega también:
- `DB_HOST`: El host de tu servidor MySQL en la nube
- `DB_PORT`: `3306`
- `DB_USER`: Tu usuario de MySQL
- `DB_PASSWORD`: Tu contraseña
- `DB_NAME`: `adoptafelizdb`

> **Importante:** Si no configuras las variables `DB_*`, ¡la app funciona de inmediato igualmente! Utilizará el motor persistente de datos que ya tiene precargado el 100% de los usuarios y pagos de tu archivo `adoptafelizdb__2__0d2b1f1f.sql`.

---

### Paso 5: Desplegar y Obtener tu Enlace Público
1. Haz clic en el botón **"Deploy Web Service"** o **"Create Web Service"**.
2. Render mostrará la consola de compilación en tiempo real:
   - Instalará dependencias (`npm install`).
   - Compilará la interfaz con Vite (`npm run build`).
   - Levantará el servidor Express (`npm start`).
3. En menos de 2 minutos verás el estado en verde **"Live"**.
4. ¡Listo! En la parte superior de tu panel en Render verás tu URL oficial con HTTPS, por ejemplo:
   `https://adoptafeliz-web.onrender.com`

---

## 📁 Archivo Blueprint Incluido (`render.yaml`)
Este proyecto ya incluye el archivo `render.yaml` en la raíz. Si prefieres un despliegue aún más automatizado, en Render puedes ir a **"New +" ➔ "Blueprint"**, seleccionar tu repositorio, y Render leerá la configuración automáticamente sin que tengas que escribir ningún comando manual.
