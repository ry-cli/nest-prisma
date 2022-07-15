import { Logger } from './../../utils/log4js.util'
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    SetMetadata,
    UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateDemoDto } from './dto/create-demo.dto'
import { DemoService } from './demo.service'
import { SqlException } from '../../common/exception/sql.exception'
import { ServerException } from '../../common/exception/server.exception'
import { Code } from '../../config/code.config'
import { AuthGuard } from '../../common/guard/auth.guard'
import { DemoAuthor, DemoMsg } from '@prisma/client'

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
    @Get('demo6/error1')
    demoErr1(): string {
        throw new ServerException('服务出错', Code.AuthVerifyFail)
    }

    // 异常
    @Get('demo6/error2')
    demoErr2(@Query() { uid, name }): string {
        console.log(uid, name)
        throw new SqlException('sql 出错')
    }

    // 守卫：通常用来鉴权，可以放在控制器上
    @Get('demo7')
    @UseGuards(AuthGuard)
    @SetMetadata('roles', ['admin', 'manager'])
    getUser() {
        return {
            uid: 1,
        }
    }

    @Get('demo8/:id')
    async getDemoAuthorById(@Param('id') id: string): Promise<DemoAuthor> {
        return this.demoService.demoAuthor({ id: Number(id) })
    }

    @Get('demo9/all')
    async getUsers(): Promise<DemoMsg[]> {
        return this.demoService.demoMsgs({
            where: { published: true },
        })
    }

    @Get('demo10/feed')
    async getPublishedPosts(): Promise<DemoMsg[]> {
        return this.demoService.demoMsgs({
            where: { published: true },
        })
    }

    @Get('demo11/:searchString')
    async getFilteredPosts(@Param('searchString') searchString: string): Promise<DemoMsg[]> {
        return this.demoService.demoMsgs({
            where: {
                OR: [
                    {
                        title: { contains: searchString },
                    },
                    {
                        content: { contains: searchString },
                    },
                ],
            },
        })
    }

    @Post('demo12/msg')
    async createDraft(@Body() postData: { title: string; content?: string; authorEmail: string }): Promise<DemoMsg> {
        const { title, content, authorEmail } = postData
        return this.demoService.createDemoMsg({
            title,
            content,
            author: {
                connect: { email: authorEmail },
            },
        })
    }

    @Post('demo13/author')
    async signupUser(@Body() userData: { name?: string; email: string }): Promise<DemoAuthor> {
        return this.demoService.createDemoAuthor(userData)
    }

    @Put('demo14/:id')
    async publishPost(@Param('id') id: string): Promise<DemoMsg> {
        return this.demoService.updateDemoMsg({
            where: { id: Number(id) },
            data: { published: true },
        })
    }

    @Delete('demo15/:id')
    async deletePost(@Param('id') id: string): Promise<DemoMsg> {
        return this.demoService.deleteDemoMsg({ id: Number(id) })
    }
}
