import { Demo } from '../interface/demo.interface'
export class UpdateDemoDto implements Demo {
    uid: number
    name: string
    username: string
    password: string
}
