/**
 * 捕获任意异常
 */
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Request, Response } from 'express'
import { Code } from 'src/config/code.config'
import { Logger } from '../../utils/log4js.util'

// @Catch(HttpException) 则只接收 trhow new HttpException()
@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const res = ctx.getResponse<Response>()
        const req = ctx.getRequest<Request>()

        // 组装日志信息
        if (req.originalUrl === '/favicon.ico') {
            return
        }

        // 组装日志信息
        const logFormat = `   origin: ${req.originalUrl} ${req.method}  ${req.ip}
    params: ${JSON.stringify(req.params)}
    query: ${JSON.stringify(req.query)}
    body: ${JSON.stringify(req.body)}
    exception:${exception}`

        Logger.error(logFormat)
        res.status(200)
        res.send(Code.ServerError)
    }
}
