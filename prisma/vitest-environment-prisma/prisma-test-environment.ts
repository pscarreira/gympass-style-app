import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest/environments'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL (schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Provide a Database URL')
  }
  // postgresql://docker:docker@localhost:5432/gympass-clone-pg?schema=public
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment> {
  name: 'prisma',
  transformMode: 'ssr',
  async setup () {
    console.log('Environment Prisma UP')
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL
    execSync('npx prisma migrate deploy')

    return {
      async teardown () {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`

        )
        await prisma.$disconnect()
        console.log('Environment Prisma DOWN')
      }
    }
  }
}
