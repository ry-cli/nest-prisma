import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DemoModule } from './module/demo/demo.module'
import { AuthModule } from './module/auth/auth.module'
import { UserModule } from './module/user/user.module'
import { PrismaService } from './module/prisma/prisma.service'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        DemoModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
