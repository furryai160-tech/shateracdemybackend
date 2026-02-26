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
exports.CourseAccessGuard = void 0;
const common_1 = require("@nestjs/common");
const enrollments_service_1 = require("../../enrollments/enrollments.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let CourseAccessGuard = class CourseAccessGuard {
    prisma;
    enrollmentsService;
    constructor(prisma, enrollmentsService) {
        this.prisma = prisma;
        this.enrollmentsService = enrollmentsService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const courseId = request.params.courseId || request.body.courseId;
        if (!user || !courseId) {
            throw new common_1.UnauthorizedException('Missing user or course information');
        }
        const enrollment = await this.enrollmentsService.checkEnrollment(user.id, courseId);
        if (enrollment)
            return true;
        throw new common_1.UnauthorizedException('You are not enrolled in this course');
    }
};
exports.CourseAccessGuard = CourseAccessGuard;
exports.CourseAccessGuard = CourseAccessGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        enrollments_service_1.EnrollmentsService])
], CourseAccessGuard);
//# sourceMappingURL=course-access.guard.js.map