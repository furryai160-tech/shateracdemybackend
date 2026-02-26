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
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CertificatesService = class CertificatesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generate(userId, courseId) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
            include: {
                course: true,
                user: true,
            },
        });
        if (!enrollment) {
            throw new common_1.BadRequestException('User is not enrolled in this course');
        }
        if (enrollment.progress < 100) {
            throw new common_1.BadRequestException('Course is not 100% completed yet.');
        }
        return {
            message: 'Certificate generated successfully',
            url: `/certificates/${userId}-${courseId}.pdf`,
            date: new Date()
        };
    }
    async findAll(userId) {
        const enrollments = await this.prisma.enrollment.findMany({
            where: { userId, progress: 100 },
            include: { course: true }
        });
        return enrollments.map((e) => ({
            id: `${e.userId}-${e.courseId}`,
            courseName: e.course.title,
            date: e.updatedAt,
            url: `/certificates/${e.userId}-${e.courseId}.pdf`
        }));
    }
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map