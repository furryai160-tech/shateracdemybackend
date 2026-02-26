import { PrismaService } from '../prisma/prisma.service';
export declare class EnrollmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, courseId: string): Promise<{
        course: {
            id: string;
            title: string;
            description: string | null;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            gradeLevel: string | null;
            thumbnail: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            isPublished: boolean;
        };
    } & {
        id: string;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        progress: number;
    }>;
    findMyEnrollments(userId: string): Promise<({
        course: {
            id: string;
            title: string;
            description: string | null;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            gradeLevel: string | null;
            thumbnail: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            isPublished: boolean;
        };
    } & {
        id: string;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        progress: number;
    })[]>;
    checkEnrollment(userId: string, courseId: string): Promise<{
        id: string;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        progress: number;
    } | null>;
}
