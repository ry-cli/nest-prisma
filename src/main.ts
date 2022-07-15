import * as express from 'express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggeUtil } from './utils/swagger.util'
// import { ResponseInterceptor } from './common/interceptor/response.interceptor'
import { AnyExceptionFilter } from './common/filter/any-exception.filter'
import { logger } from './common/middleware/logger.middleware'

async function bootstrap() {
    // 创建配置
    const SEVER_ENV = process.env.SEVER_ENV
    const API_VERSION = process.env.API_VERSION
    const SERVER_PORT = process.env.SERVER_PORT

    const app = await NestFactory.create(AppModule)

    // 路由前缀
    app.setGlobalPrefix(API_VERSION)
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // 全局日志中间件
    app.use(logger)
    //格式化 正确响应的返回体
    // app.useGlobalInterceptors(new ResponseInterceptor())
    // 过滤处理异常
    app.useGlobalFilters(new AnyExceptionFilter())

    // swagger 文档配置初始化
    SwaggeUtil.init(app)

    await app.listen(SERVER_PORT)
    console.log(`${SEVER_ENV} sever start on: ${SERVER_PORT}`)
}
bootstrap()
