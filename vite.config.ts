import { defineConfig } from 'vitest/config'
import tsconfigpaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigpaths()],
  test: {
    workspace: [
      {
        test: {
          include: ['src/http/controllers/**.spec.ts'],
          environment: 'prisma'
        }
      }
    ]
  }
})
