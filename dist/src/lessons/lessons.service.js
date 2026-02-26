"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LessonsService = class LessonsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createLessonDto) {
        return this.prisma.lesson.create({
            data: createLessonDto,
        });
    }
    async findAll() {
        return this.prisma.lesson.findMany({
            include: {
                quizzes: true
            }
        });
    }
    async findOne(id) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id },
            include: {
                quizzes: true
            }
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson #${id} not found`);
        }
        return lesson;
    }
    async update(id, updateLessonDto) {
        return this.prisma.lesson.update({
            where: { id },
            data: updateLessonDto,
        });
    }
    async remove(id) {
        return this.prisma.lesson.delete({
            where: { id },
        });
    }
    async complete(lessonId, userIdArg) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id: lessonId }
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson #${lessonId} not found`);
        }
        const progress = await this.prisma.lessonProgress.upsert({
            where: {
                userId_lessonId: {
                    userId: userIdArg,
                    lessonId
                }
            },
            update: { isCompleted: true },
            create: {
                userId: userIdArg,
                lessonId,
                isCompleted: true
            }
        });
        const totalCourseLessons = await this.prisma.lesson.count({
            where: { courseId: lesson.courseId }
        });
        if (totalCourseLessons > 0) {
            const completedLessons = await this.prisma.lessonProgress.count({
                where: {
                    userId: userIdArg,
                    isCompleted: true,
                    lesson: { courseId: lesson.courseId }
                }
            });
            const courseProgress = Math.round((completedLessons / totalCourseLessons) * 100);
            await this.prisma.enrollment.updateMany({
                where: {
                    userId: userIdArg,
                    courseId: lesson.courseId
                },
                data: {
                    progress: Math.min(courseProgress, 100)
                }
            });
        }
        return progress;
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map