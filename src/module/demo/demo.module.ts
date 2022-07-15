import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { DemoController } from './demo.controller'
import { DemoService } from './demo.service'
// import { DemoMiddleware } from '../../common/middleware/demo.middleware'

@Module({
    controllers: [DemoController],
    providers: [DemoService],
})
export class DemoModule implements NestModule {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    configure(consumer: MiddlewareConsumer) {
        // 所有 /v1/demo 路由都要走 demo 中间件
        // consumer.apply(DemoMiddleware).forRoutes('')
        // 忽略某个路由:/v1/demo/more  支持通配符
        // consumer
        //     .apply(DemoMiddleware)
        //     .exclude(
        //         { path: '/v1/demo/more', method: RequestMethod.GET },
        //         { path: '/v1/demo/:uid', method: RequestMethod.GET }
        //     )
        //     .forRoutes('demo')
        // 整个 demo 控制器 都要走 demo 中间件
        // consumer.apply(DemoMiddleware).forRoutes(DemoController)
        // 忽略某个路由:/v1/demo/more  支持通配符
        // consumer
        //     .apply(DemoMiddleware)
        //     .exclude(
        //         { path: '/v1/demo/more', method: RequestMethod.GET },
        //         { path: '/v1/demo/more', method: RequestMethod.GET }
        //     )
        //     .forRoutes(DemoController)
    }
}
