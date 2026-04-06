# GifExpertApp - Buscador de GIFs

Este proyecto es una aplicación sencilla desarrollada en React para buscar y mostrar GIFs animados utilizando la API de Giphy.

## Notas Importantes

> [!IMPORTANT]
> Este repositorio es de **uso personal** y fue desarrollado como parte de un **curso de formación**. El objetivo principal es el aprendizaje de conceptos fundamentales de React y TypeScript.

## Características

- Búsqueda de GIFs por categorías.
- Persistencia de categorías buscadas (opcional/según avance).
- Integración con la API de Giphy.
- Pruebas unitarias y de integración con Vitest.
- Estructura de componentes reutilizables.
- Uso de Hooks (useState, useEffect, Custom Hooks).

## Tecnologías Utilizadas

- **React 19**
- **TypeScript**
- **Vite** (para el desarrollo y empaquetado)
- **Axios** (para peticiones HTTP)
- **Vitest** (para pruebas)
- **Testing Library** (para pruebas de componentes)

## Instalación y Configuración

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Kevito11/buscador-de-gifs1-kvaldez.git
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno:
   - Crea un archivo `.env` basado en `.env.template`.
   - Agrega tu `VITE_GIPHY_API_KEY` (puedes obtener una en [Giphy Developers](https://developers.giphy.com/)).

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Pruebas

Para ejecutar la suite de pruebas:
```bash
npm run test
```
Para ver la cobertura:
```bash
npm run coverage
```
