import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, DemoAuthor, DemoMsg } from '@prisma/client'

@Injectable()
export class DemoService {
    constructor(private prisma: PrismaService) {}
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
    async demoAuthor(demoAuthorWhereUniqueInput: Prisma.DemoAuthorWhereUniqueInput): Promise<DemoAuthor | null> {
        return this.prisma.demoAuthor.findUnique({
            where: demoAuthorWhereUniqueInput,
        })
    }

    async demoAuthors(params: {
        skip?: number
        take?: number
        cursor?: Prisma.DemoAuthorWhereUniqueInput
        where?: Prisma.DemoAuthorWhereInput
        orderBy?: Prisma.DemoAuthorOrderByWithRelationInput
    }): Promise<DemoAuthor[]> {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.demoAuthor.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        })
    }

    async createDemoAuthor(data: Prisma.DemoAuthorCreateInput): Promise<DemoAuthor> {
        return this.prisma.demoAuthor.create({
            data,
        })
    }

    async updateDemoAuthor(params: {
        where: Prisma.DemoAuthorWhereUniqueInput
        data: Prisma.DemoAuthorUpdateInput
    }): Promise<DemoAuthor> {
        const { where, data } = params
        return this.prisma.demoAuthor.update({
            data,
            where,
        })
    }

    async deleteDemoAuthor(where: Prisma.DemoAuthorWhereUniqueInput): Promise<DemoAuthor> {
        return this.prisma.demoAuthor.delete({
            where,
        })
    }

    async demoMsg(postWhereUniqueInput: Prisma.DemoMsgWhereUniqueInput): Promise<DemoMsg | null> {
        return this.prisma.demoMsg.findUnique({
            where: postWhereUniqueInput,
        })
    }

    async demoMsgs(params: {
        skip?: number
        take?: number
        cursor?: Prisma.DemoMsgWhereUniqueInput
        where?: Prisma.DemoMsgWhereInput
        orderBy?: Prisma.DemoMsgOrderByWithRelationInput
    }): Promise<DemoMsg[]> {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.demoMsg.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        })
    }

    async createDemoMsg(data: Prisma.DemoMsgCreateInput): Promise<DemoMsg> {
        return this.prisma.demoMsg.create({
            data,
        })
    }

    async updateDemoMsg(params: {
        where: Prisma.DemoMsgWhereUniqueInput
        data: Prisma.DemoMsgUpdateInput
    }): Promise<DemoMsg> {
        const { data, where } = params
        return this.prisma.demoMsg.update({
            data,
            where,
        })
    }

    async deleteDemoMsg(where: Prisma.DemoMsgWhereUniqueInput): Promise<DemoMsg> {
        return this.prisma.demoMsg.delete({
            where,
        })
    }
}
