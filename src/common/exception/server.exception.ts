/**
 * 服务出错时抛出的异常
 */
import { HttpException } from '@nestjs/common'
import { IResponseCode } from 'src/config/code.config'
export class ServerException extends HttpException {
    public code: IResponseCode
    constructor(excetption: string, code: IResponseCode) {
        super(excetption, 200)
        this.code = code
    }
}
