import { PrismaClient } from '@prisma/client'

class DBConnection {
  private static _connectionString = process.env.DATABASE_URL

  public static get connectionString(): string | undefined {
    return this._connectionString
  }

  public static set connectionString(value: string | undefined) {
    this._connectionString = value
    this._instance = new PrismaClient({
      datasources: {
        db: {
          url: this._connectionString,
        },
      },
    })
  }

  private static _instance: PrismaClient | null = null

  public static get instance(): PrismaClient {
    if (!this._instance) {
      this._instance = new PrismaClient({
        datasources: {
          db: {
            url: this._connectionString,
          },
        },
      })
    }

    return this._instance
  }
}

export default DBConnection
