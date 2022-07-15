import * as Log4js from 'log4js'
import * as StackTrace from 'stacktrace-js'
import { basename } from 'path'
import { log4jsConfig } from 'src/config/log.config'

// 实例化
Log4js.configure(log4jsConfig)
const logger = Log4js.getLogger('default')
logger.level = Log4js.levels.TRACE

// 定义 log 类方法
export class Logger {
    static trace(...args) {
        logger.trace(Logger.getStackTrace(), ...args)
    }

    static debug(...args) {
        logger.debug(Logger.getStackTrace(), ...args)
    }

    static log(...args) {
        logger.info(Logger.getStackTrace(), ...args)
    }

    static info(...args) {
        logger.info(Logger.getStackTrace(), ...args)
    }

    static warn(...args) {
        logger.warn(Logger.getStackTrace(), ...args)
    }

    static error(...args) {
        logger.error(Logger.getStackTrace(), ...args)
    }

    static fatal(...args) {
        logger.fatal(Logger.getStackTrace(), ...args)
    }

    static access(...args) {
        const loggerCustom = Log4js.getLogger('http')
        loggerCustom.info(Logger.getStackTrace(), ...args)
    }

    // 日志追踪，可以追溯到哪个文件、第几行第几列 参考：https://www.npmjs.com/package/stacktrace-js
    private static getStackTrace(deep = 2): string {
        const stackList: StackTrace.StackFrame[] = StackTrace.getSync()
        const stackInfo: StackTrace.StackFrame = stackList[deep]
        const lineNumber: number = stackInfo.lineNumber
        const columnNumber: number = stackInfo.columnNumber
        const fileName: string = stackInfo.fileName
        const realName: string = basename(fileName)
        return `${realName}(line: ${lineNumber}, column: ${columnNumber}): \n`
    }
}
