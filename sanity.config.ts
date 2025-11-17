import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Blog NexOps',

  // ⚠️ IMPORTANTE: estos dos campos son los que te faltaban
  projectId: 't7ofgkv4',   // el que viste en el dashboard de Sanity
  dataset: 'production',   // o el nombre del dataset si usaste otro

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
