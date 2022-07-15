import { Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    register() {
        console.log('register')
        this.userService.register()
    }

    @Post('login')
    login() {
        console.log('login')
    }

    @Post('logout')
    logout() {
        console.log('logout')
    }
}
