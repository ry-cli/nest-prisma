export class ServerConfig {
    port: number
    api: string
    constructor(env: string, api: string) {
        if (!env || env == 'dev') {
            console.log('开发环境')

            this.port = 3131
        }

        if (env == 'prod') {
            this.port = 3132
        }
        this.api = api
    }
}
