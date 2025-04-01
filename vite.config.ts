import { defineConfig } from 'vitest/config'
import tsconfigpaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigpaths()],
  test: {
    dir: 'src',
    workspace: [
      {
        extends: true,
        test: {
          include: ['http/controllers/**/*.spec.ts'],
          name: 'E2ETests',
          environment: 'prisma',
        }
      },
      {
        extends: true,
        test: {
          include: ['use-cases/**/*.spec.ts'],
          name: 'UnitTests',
        }
      }
    ]
  }
})
