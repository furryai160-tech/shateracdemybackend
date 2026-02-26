import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export declare class PaymentsService {
    private configService;
    private prisma;
    private stripe;
    constructor(configService: ConfigService, prisma: PrismaService);
    createCheckoutSession(userId: string, courseId: string): Promise<{
        url: string | null;
    }>;
    verifySession(sessionId: string): Promise<boolean>;
}
