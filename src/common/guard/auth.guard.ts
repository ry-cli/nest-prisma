/**
 * 权限守卫
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log('执行了鉴权 gurd:')
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if (!roles) {
            return false
        }

        // 鉴权
        // const request = context.switchToHttp().getRequest()
        // const token = request.token

        return true
    }
}
