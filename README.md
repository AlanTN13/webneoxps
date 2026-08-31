# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Radar Control Center V1.2

`/radar` arma su vista desde dos fuentes canónicas:

- Las publicaciones reales se leen durante el build desde `src/data/news`.
- Las decisiones `NO_PUBLICATION` se leen en el servidor desde el repositorio privado de historial y se exponen al navegador mediante una proyección estricta.

El entorno de Vercel necesita `RADAR_HISTORY_REPOSITORY`, `RADAR_HISTORY_BRANCH` y `RADAR_HISTORY_READ_TOKEN`. El token debe tener únicamente permiso de lectura de contenidos sobre ese repositorio privado. La respuesta pública usa una lista cerrada de campos de negocio y nunca devuelve prompts, fórmulas, pesos, umbrales, credenciales ni metadatos internos de GitHub o Vercel.

Si la fuente privada no está disponible, Radar conserva las publicaciones verificadas y muestra un estado degradado explícito; no inventa oportunidades ni decisiones. Los registros sintéticos de validación sólo aparecen como actividad operativa y no se cuentan como oportunidades comerciales.
