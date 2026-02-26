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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesService = class CoursesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCourseDto, userId) {
        if (!createCourseDto.tenantId && userId) {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (user?.tenantId) {
                createCourseDto.tenantId = user.tenantId;
            }
        }
        return this.prisma.course.create({
            data: renderData(createCourseDto),
        });
    }
    async findAll(tenantId) {
        const where = tenantId ? { tenantId } : {};
        return this.prisma.course.findMany({
            where,
            include: {
                lessons: true
            }
        });
    }
    async findOne(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                lessons: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        order: true,
                        dripDelay: true,
                        isFree: true,
                    }
                }
            }
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course #${id} not found`);
        }
        return course;
    }
    async findOneForPlayer(courseId, userId) {
        console.log(`[Player] userId=${userId}, courseId=${courseId}`);
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            include: { lessons: true }
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course #${courseId} not found`);
        }
        const coursePrice = Number(course.price ?? 0);
        console.log(`[Player] coursePrice=${coursePrice}`);
        if (coursePrice > 0) {
            const enrollment = await this.prisma.enrollment.findUnique({
                where: {
                    userId_courseId: { userId, courseId }
                }
            });
            console.log(`[Player] enrollment found:`, enrollment ? 'YES' : 'NO');
            if (!enrollment) {
                const allEnrollments = await this.prisma.enrollment.findMany({
                    where: { courseId },
                    select: { userId: true, createdAt: true }
                });
                console.log(`[Player] All enrollments for this course:`, JSON.stringify(allEnrollments));
                throw new common_1.ForbiddenException('You must be enrolled in this course to access its content.');
            }
        }
        return course;
    }
    async update(id, updateCourseDto) {
        return this.prisma.course.update({
            where: { id },
            data: renderData(updateCourseDto),
        });
    }
    async remove(id) {
        return this.prisma.course.delete({
            where: { id },
        });
    }
    async getProgress(courseId, userId) {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            include: { lessons: { select: { id: true } } }
        });
        if (!course)
            return [];
        const lessonIds = course.lessons.map((l) => l.id);
        const progress = await this.prisma.lessonProgress.findMany({
            where: {
                userId,
                lessonId: { in: lessonIds },
                isCompleted: true
            }
        });
        return progress;
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
function renderData(dto) {
    return dto;
}
//# sourceMappingURL=courses.service.js.map