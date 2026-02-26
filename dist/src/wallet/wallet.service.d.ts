import { PrismaService } from '../prisma/prisma.service';
export declare class WalletService {
    private prisma;
    constructor(prisma: PrismaService);
    getBalance(userId: string): Promise<{
        balance: number;
    }>;
    requestDeposit(userId: string, amount: number, proofUrl: string | null): Promise<any>;
    getTransactions(userId: string): Promise<any>;
    getPendingRequests(user: any): Promise<any>;
    approveRequest(requestId: string): Promise<{
        message: string;
    }>;
    rejectRequest(requestId: string, reason: string): Promise<{
        message: string;
    }>;
    payForCourse(userId: string, courseId: string): Promise<{
        message: string;
    }>;
    adminCredit(adminUser: any, targetUserId: string, amount: number): Promise<{
        message: string;
    }>;
    setVodafoneCashNumber(userId: string, number: string): Promise<{
        message: string;
    }>;
    getVodafoneCashNumber(tenantId?: string): Promise<{
        number: any;
    }>;
}
