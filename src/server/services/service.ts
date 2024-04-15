import logger from '@app/server/common/logger.js'

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

  constructor(serviceName: string) {
    this.logTag = serviceName
  }
}
