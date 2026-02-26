import { EnrollmentsService } from './enrollments.service';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    create(req: any, courseId: string): Promise<{
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
    adminEnroll(req: any, userId: string, courseId: string): Promise<{
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
    }> | {
        error: string;
    };
    findMyEnrollments(req: any): Promise<({
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
    check(req: any, courseId: string): Promise<{
        id: string;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        progress: number;
    } | null>;
}
