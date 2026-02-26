import { PrismaService } from '../prisma/prisma.service';
export declare class CertificatesService {
    private prisma;
    constructor(prisma: PrismaService);
    generate(userId: string, courseId: string): Promise<{
        message: string;
        url: string;
        date: Date;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        courseName: any;
        date: any;
        url: string;
    }[]>;
}
