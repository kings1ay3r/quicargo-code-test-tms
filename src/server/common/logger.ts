// TODO: (GoodToHave) Implement a structured logger
const logger = {
  log(tag: string, ...args: any[]) {
    console.log(`[${tag}]`, ...args)
  },
  info(tag: string, ...args: any[]) {
    console.info(`[${tag}]`, ...args)
  },
  error(tag: string, ...args: any[]) {
    console.error(`[${tag}]`, ...args)
  },
}

export default logger
