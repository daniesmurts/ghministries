import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { documentInternationalization } from '@sanity/document-internationalization'
import { structure } from './deskStructure'
import { schemaTypes } from './schemas/index'
import StudioLogo from './components/StudioLogo'

export default defineConfig({
  name: 'gh-ministries',
  title: 'Great Harvest Ministries',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
    media(),
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'ru', title: 'Russian' },
      ],
      schemaTypes: ['sermon', 'event', 'page', 'leader', 'homeGroup'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo: StudioLogo,
    },
  },

  theme: {
    // Custom theme matching Kinetic Sanctity
    '--brand-primary': '#6344FF',
    '--brand-primary-assistive': '#FF5C1A',
  },
})
