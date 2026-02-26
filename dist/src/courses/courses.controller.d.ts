import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(req: any, createCourseDto: CreateCourseDto): Promise<{
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
    findAll(tenantId: string): Promise<({
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
    findTeacherCourses(req: any): Promise<({
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
    getProgress(id: string, req: any): Promise<{
        id: string;
        updatedAt: Date;
        userId: string;
        lessonId: string;
        isCompleted: boolean;
    }[]>;
    getPlayerData(id: string, req: any): Promise<{
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
}
