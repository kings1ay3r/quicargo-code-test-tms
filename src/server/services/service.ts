import logger from '@app/server/common/logger'
import prisma from '@app/server/repository/prismaClient'

export class Service {
  logTag: string
  logger: {
    info: (message: string) => void
    error: (message: string) => void
    log: (message: string) => void
  } = {
    log: (...args) => logger.log(this.logTag, ...args),
    info: (...args) => logger.info(this.logTag, ...args),
    error: (...args) => logger.error(this.logTag, ...args),
  }

  // TODO: (SanityEnhancements) Annotate type for prisma
  repository: Record<string, any>

  constructor(serviceName: string, repositoryName: string) {
    this.logTag = serviceName
    this.repository = prisma
    if (!this.repository) {
      this.logger.error('Repository not found')
      throw new Error('Repository not found')
    }
  }
}
