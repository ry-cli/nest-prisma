import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'
import { swaggerConfig } from 'src/config/swagger.config'

export class SwaggeUtil {
    static init(app: INestApplication) {
        const config = new DocumentBuilder()
            .setTitle(swaggerConfig.title)
            .setDescription(swaggerConfig.description)
            .setVersion(swaggerConfig.version)
            .addTag(swaggerConfig.tag)
            .build()
        const document = SwaggerModule.createDocument(app, config)
        SwaggerModule.setup('api', app, document)
    }
}
