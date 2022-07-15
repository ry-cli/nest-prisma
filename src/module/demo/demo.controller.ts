import { Logger } from './../../utils/log4js.util'
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, SetMetadata, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateDemoDto } from './dto/create-demo.dto'
import { DemoService } from './demo.service'
import { SqlException } from '../../common/exception/sql.exception'
import { ServerException } from '../../common/exception/server.exception'
import { Code } from '../../config/code.config'
import { AuthGuard } from '../../common/guard/auth.guard'

@Controller('demo')
@ApiTags('Demo 模块')
export class DemoController {
    constructor(private demoService: DemoService) {}

    // query 参数：自动解析参数
    @Get('demo1')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    demoA(@Query() query: Record<string, any>) {
        Logger.info('demo1-info............query')
        Logger.error('demo1-error..........query')
        return {}
    }

    // 多个参数
    @Get('demo2')
    demoB(@Query() { uid, name }): string {
        console.log(uid, name)
        return 'hh'
    }

    // param 参数
    @Get('demo3/:uid')
    demoC(@Param() param: { uid: number }) {
        console.log('uid:', param.uid)
        return {}
    }

    // Body参数
    @Post('demo4')
    demoE(@Body() demo: CreateDemoDto) {
        console.log('demo:', demo)
        return demo
    }

    // 管道校验 param 参数：这里如果 uid 不是数字，则自动报 404 错误
    @Get('demo5/:uid')
    demoD(@Param('uid', new ParseIntPipe()) uid: number) {
        console.log('uid:', uid)
        return uid
    }

    // 异常
    @Get('error1')
    demoErr1(): string {
        throw new ServerException('服务出错', Code.AuthVerifyFail)
    }

    // 异常
    @Get('error2')
    demoErr2(@Query() { uid, name }): string {
        console.log(uid, name)
        throw new SqlException('sql 出错')
    }

    // 守卫：通常用来鉴权，可以放在控制器上
    @Get('user')
    @UseGuards(AuthGuard)
    @SetMetadata('roles', ['admin', 'manager'])
    getUser() {
        return {
            uid: 1,
        }
    }
}
