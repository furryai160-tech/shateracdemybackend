import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
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
    complete(id: string, req: any): Promise<{
        id: string;
        updatedAt: Date;
        userId: string;
        lessonId: string;
        isCompleted: boolean;
    }>;
}
