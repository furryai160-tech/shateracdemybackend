import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
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
