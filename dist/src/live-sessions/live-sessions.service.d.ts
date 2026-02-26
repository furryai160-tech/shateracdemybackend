import { PrismaService } from '../prisma/prisma.service';
export declare class LiveSessionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        title: string;
        description?: string;
        courseId: string;
        scheduledAt: Date;
        teacherId: string;
        tenantId: string;
    }): Promise<any>;
    findAll(tenantId: string): Promise<any>;
    getSession(id: string, tenantId: string): Promise<any>;
    startSession(id: string, teacherId: string, tenantId: string, userRole?: string): Promise<any>;
    endSession(id: string, teacherId: string, tenantId: string, userRole?: string): Promise<any>;
    generateAgoraTokenStr(channelName: string, role: 'publisher' | 'subscriber', userAccount: string): string;
}
