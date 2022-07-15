/**
 * 拦截器：格式化出参信息
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Code } from '../../config/code.config'
import { Logger } from '../../utils/log4js.util'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.getArgByIndex(1).req
        return next.handle().pipe(
            map((data) => {
                if (!req.data) {
                    req.data = []
                }

                // 组装日志信息
                if (req.originalUrl === '/favicon.ico') {
                    return
                }

                // 组装日志信息
                const logFormat = `   origin: ${req.originalUrl} ${req.method}  ${req.ip}
    params: ${JSON.stringify(req.params)}
    query: ${JSON.stringify(req.query)}
    body: ${JSON.stringify(req.body)}
    res:${JSON.stringify(data)}`

                Logger.log(logFormat)
                Logger.access(logFormat)
                return {
                    ...Code.OK,
                    data,
                }
            })
        )
    }
}
