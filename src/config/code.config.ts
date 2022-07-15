export interface IResponseCode {
    code: number
    msg: string
    data?: any[]
    error?: any
}

export class Code {
    static readonly OK = { code: 1, msg: '成功' }
    static readonly AccountNotFound = { code: 2001, msg: '未查找到该账户' }
    static readonly AccountFound = { code: 2002, msg: '账户信息已存在' }
    static readonly AuthVerifyFail = { code: 2003, msg: '权限校验未通过' }
    static readonly ParamWrong = { code: 3001, msg: '参数不合法' }
    static readonly CodeWrong = { code: 3002, msg: '验证码不合法' }
    static readonly SourceNotFound = { code: 4001, msg: '资源不存在' }
    static readonly ServerError = { code: 5003, msg: '网络服务异常' }
    static readonly SqlError = { code: 5002, msg: '数据服务异常' }
}
