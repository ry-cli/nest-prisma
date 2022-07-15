/**
 * sql 错误时抛出的异常
 */
import { HttpException } from '@nestjs/common'
export class SqlException extends HttpException {
    constructor(excetption: string) {
        super(excetption, 200)
    }
}
