import * as crypto from 'crypto'

export default class CryptoUtil {
    // 加盐算法
    static getSalt(): string {
        return crypto.randomBytes(3).toString('base64')
    }
    // 加密算法
    static encript(str: string): string {
        return crypto.pbkdf2Sync(str, CryptoUtil.getSalt(), 10000, 16, 'sha256').toString()
    }
}
