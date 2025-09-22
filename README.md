# COTIZADOR — App de escritorio con Electron

## Instalación y ejecución en Windows, Mac y Linux

### Requisitos previos

- [Node.js y npm](https://nodejs.org/) instalados.
- **(Windows)** Se recomienda instalar [Git Bash](https://gitforwindows.org/) para usar la terminal si usas Windows.

### Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/Carlosdiaz83/COTIZADOR.git
   cd COTIZADOR
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Ejecuta la aplicación de escritorio:
   ```sh
   npm run electron
   ```

Esto abrirá una ventana con la app COTIZADOR.

---

## Ejecución en Android (opcional, solo para usuarios avanzados)

Puedes ejecutar la app en Android usando Termux + VNC, siguiendo estos pasos:

1. Instala Termux desde F-Droid.
2. Instala Node.js y Git en Termux:
   ```sh
   pkg install nodejs git
   ```
3. Clona el repositorio y sigue los pasos de instalación arriba.
4. Instala y configura un servidor VNC para abrir ventanas gráficas (consulta tutoriales sobre Termux + VNC).
5. Ejecuta `npm run electron` y accede por VNC.

---

## Estructura del proyecto

- `electron-main.js` — Archivo principal de Electron.
- `src/` — Código fuente React + TypeScript.
- `package.json` — Configuración y dependencias.

---

## Publicar tu app

Para crear un instalador (.exe, .dmg, .AppImage), consulta [Electron Forge](https://www.electronforge.io/) o [Electron Builder](https://www.electron.build/).

---

## Soporte

Escríbeme por GitHub Issues si tienes problemas de instalación o ejecución.