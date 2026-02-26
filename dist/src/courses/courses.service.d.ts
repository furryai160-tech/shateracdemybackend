import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCourseDto: CreateCourseDto, userId?: string): Promise<{
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
    }>;
    findAll(tenantId?: string): Promise<({
        lessons: {
            id: string;
            title: string;
            description: string | null;
            courseId: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            videoProvider: import("@prisma/client").$Enums.VideoProvider | null;
            videoId: string | null;
            videoDuration: number | null;
            pdfUrl: string | null;
            pdfTitle: string | null;
            isFree: boolean;
            dripDelay: number;
        }[];
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        lessons: {
            id: string;
            title: string;
            description: string | null;
            order: number;
            isFree: boolean;
            dripDelay: number;
        }[];
    } & {
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
    }>;
    findOneForPlayer(courseId: string, userId: string): Promise<{
        lessons: {
            id: string;
            title: string;
            description: string | null;
            courseId: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            videoProvider: import("@prisma/client").$Enums.VideoProvider | null;
            videoId: string | null;
            videoDuration: number | null;
            pdfUrl: string | null;
            pdfTitle: string | null;
            isFree: boolean;
            dripDelay: number;
        }[];
    } & {
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
    }>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    getProgress(courseId: string, userId: string): Promise<{
        id: string;
        updatedAt: Date;
        userId: string;
        lessonId: string;
        isCompleted: boolean;
    }[]>;
}
