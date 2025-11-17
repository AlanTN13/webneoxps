// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Blog NexOps',

  // ID del proyecto y dataset (los mismos que en el dashboard)
  projectId: 't7ofgkv4',
  dataset: 'production',

  // Opcional pero recomendado: para que no te vuelva a preguntar al hacer `sanity deploy`
  deployment: {
    appId: 'emr609lyu6vvwbp5h6zi0df8', // copiá el appId que te mostró el deploy
    studioHost: 'nexops',                   // esto genera nexops.sanity.studio
  },

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
