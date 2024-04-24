import logger from '@app/server/common/logger'
import prisma, { Repository } from '@app/server/repository/prismaClient'

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
  repository: Repository

  constructor(serviceName: string) {
    this.logTag = serviceName
    this.repository = prisma
    if (!this.repository) {
      this.logger.error('Repository not found')
      throw new Error('Repository not found')
    }
  }
}
