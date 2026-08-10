# Foco — Guía de instalación como PWA

Esta carpeta contiene todo lo necesario para publicar tu app **Foco** en internet y luego instalarla como una aplicación en tu PC y celular.

## Contenido de la carpeta

- `index.html` — la app en sí (todo el código)
- `manifest.json` — configuración de la app (nombre, colores, íconos)
- `service-worker.js` — permite que funcione sin conexión
- `icon-192.png` — ícono chico (192×192 px)
- `icon-512.png` — ícono grande (512×512 px)
- `LEEME.md` — este archivo

## Paso 1 — Publicarla en GitHub Pages

### 1.1. Crear cuenta y repositorio

1. Ve a https://github.com/ y crea una cuenta si no tienes (gratis).
2. Toca el botón verde **"New"** o **"Nuevo"** para crear un repositorio nuevo.
3. Ponle un nombre corto y sin espacios, por ejemplo: `foco`.
4. Déjalo en **Public** (necesario para GitHub Pages gratis).
5. Marca la opción **"Add a README file"**.
6. Toca **"Create repository"**.

### 1.2. Subir los archivos

Opción A — desde la web de GitHub (más fácil, no requiere Git):

1. Dentro del repositorio recién creado, toca **"Add file" → "Upload files"**.
2. Arrastra los 5 archivos de esta carpeta (`index.html`, `manifest.json`, `service-worker.js`, `icon-192.png`, `icon-512.png`) al área de subida.
3. Baja hasta el final y toca **"Commit changes"**.

Opción B — desde tu PC con Git (si ya lo tienes instalado):

```bash
cd "C:\Users\Jose Castillo\OneDrive\Desktop\Foco"
git init
git remote add origin https://github.com/TU-USUARIO/foco.git
git add .
git commit -m "Primera versión de Foco"
git branch -M main
git push -u origin main
```

### 1.3. Activar GitHub Pages

1. En el repositorio, toca la pestaña **"Settings"** (arriba a la derecha).
2. En el menú lateral, toca **"Pages"**.
3. En "Source", elige la rama **`main`** y la carpeta **`/ (root)`**.
4. Toca **"Save"**.
5. Espera 1–2 minutos. GitHub te dará una URL como:
   `https://TU-USUARIO.github.io/foco/`

Esa es la URL de tu app.

## Paso 2 — Instalarla en tu PC

1. Abre la URL en **Chrome** o **Edge**.
2. En la barra de direcciones verás un ícono a la derecha (⊕ o un monitor con flecha) que dice **"Instalar Foco"**. Tócalo.
3. Confirma la instalación.
4. Ya la tienes como app con ícono en el escritorio y menú de inicio. Se abre sin barra de navegador, como una app real.

## Paso 3 — Instalarla en tu celular

### Android (Chrome)

1. Abre la URL en Chrome del celular.
2. Toca el menú (los 3 puntitos arriba a la derecha).
3. Toca **"Instalar aplicación"** o **"Añadir a la pantalla de inicio"**.
4. Confirma.

### iPhone (Safari)

1. Abre la URL en Safari.
2. Toca el botón de compartir (cuadrado con flecha hacia arriba).
3. Baja y toca **"Añadir a pantalla de inicio"**.
4. Confirma.

## Actualizar la app en el futuro

Cuando quieras hacer cambios:

1. Cambia lo que necesites en los archivos.
2. Súbelos al repositorio de GitHub (arrastrar y confirmar de nuevo, o `git push`).
3. **Importante**: cambia la línea 5 de `service-worker.js` de `foco-v1` a `foco-v2` (y luego a v3, v4, etc.) cada vez que actualices. Eso obliga a la app instalada a bajar los cambios nuevos en vez de usar el cache viejo.

## Sobre los datos

Como esta app corre desde tu propio dominio, **los datos ahora se guardan en el navegador del dispositivo** (no en la nube de Claude). Eso significa:

- No dependes del servicio de Claude para que funcione.
- Los datos son 100% tuyos y viven en tu PC y en tu celular por separado.
- **Cada dispositivo tiene su propia copia** — si creas una nota en el PC no aparecerá en el celular automáticamente.

Si más adelante quieres sincronizar entre dispositivos, se puede agregar un backend simple (Firebase, Supabase — ambos gratis para uso personal). Podemos verlo cuando la app esté completa.

## Próximo paso

Cuando ya tengas la app publicada e instalada, avisa a Jarvis y agregamos el módulo de **Recordatorios** con notificaciones locales que funcionan aunque cierres el navegador (mientras la PWA esté instalada).
