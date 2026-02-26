import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
export declare class QuizzesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createQuizDto: CreateQuizDto): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
        questions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    findAll(): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
        questions: import("@prisma/client/runtime/client").JsonValue;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
        questions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
        questions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
        questions: import("@prisma/client/runtime/client").JsonValue;
    }>;
}
