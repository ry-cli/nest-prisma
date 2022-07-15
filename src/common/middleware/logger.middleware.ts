/**
 * 日志中间件：打印入参信息
 */
import { Request, Response } from 'express'
import { Logger } from '../../utils/log4js.util'

export function logger(req: Request, res: Response, next: () => any) {
    const code = res.statusCode //响应状态码
    next()

    if (req.originalUrl === '/favicon.ico') {
        return
    }

    // 组装日志信息
    const logFormat = `   origin: ${req.originalUrl}  ${code}  ${req.method}  ${req.ip}
    params: ${JSON.stringify(req.params)}
    query: ${JSON.stringify(req.query)}
    body: ${JSON.stringify(req.body)}`

    //根据状态码，进行日志类型区分
    if (code >= 500) {
        Logger.error(logFormat)
    } else if (code >= 400) {
        Logger.warn(logFormat)
    } else {
        Logger.access(logFormat)
        Logger.log(logFormat)
    }
}
