import { Injectable } from '@nestjs/common'

@Injectable()
export class DemoService {
    demoA() {
        return [
            { words: 'aaa1', time: '15' },
            { words: 'aaa2', time: '22' },
        ]
    }
    demoB() {
        return [
            { words: 'bbb1', time: '15' },
            { words: 'bbb2', time: '22' },
        ]
    }
}
