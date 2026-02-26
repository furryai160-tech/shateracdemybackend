import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createLessonDto: CreateLessonDto): Promise<{
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
    }>;
    findAll(): Promise<({
        quizzes: {
            id: string;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            lessonId: string | null;
            questions: import("@prisma/client/runtime/client").JsonValue;
        }[];
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        quizzes: {
            id: string;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            lessonId: string | null;
            questions: import("@prisma/client/runtime/client").JsonValue;
        }[];
    } & {
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
    }>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    complete(lessonId: string, userIdArg: string): Promise<{
        id: string;
        updatedAt: Date;
        userId: string;
        lessonId: string;
        isCompleted: boolean;
    }>;
}
