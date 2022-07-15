import { Demo } from '../interface/demo.interface'

export class CreateDemoDto implements Demo {
    uid: number
    name: string
    username: string
    password: string
}
