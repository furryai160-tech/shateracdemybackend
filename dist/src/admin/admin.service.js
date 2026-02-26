"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats(currentUser) {
        const whereUser = {};
        const whereCourse = {};
        const whereEnrollment = {};
        if (currentUser && currentUser.role === 'TEACHER') {
            whereUser.tenantId = currentUser.tenantId;
            whereUser.role = 'STUDENT';
            whereCourse.tenantId = currentUser.tenantId;
            whereEnrollment.course = {
                tenantId: currentUser.tenantId
            };
        }
        const totalUsers = await this.prisma.user.count({ where: whereUser });
        const totalCourses = await this.prisma.course.count({ where: whereCourse });
        const totalEnrollments = await this.prisma.enrollment.count({ where: whereEnrollment });
        const enrollments = await this.prisma.enrollment.findMany({
            where: whereEnrollment,
            include: { course: true }
        });
        const estimatedRevenue = enrollments.reduce((sum, e) => sum + Number(e.course.price), 0);
        return {
            totalUsers,
            totalCourses,
            totalEnrollments,
            revenue: estimatedRevenue
        };
    }
    async getAllUsers(currentUser) {
        const where = {};
        if (currentUser && currentUser.role === 'TEACHER') {
            where.tenantId = currentUser.tenantId;
            where.role = 'STUDENT';
        }
        const users = await this.prisma.user.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                gradeLevel: true,
                phone: true,
                parentPhone: true,
                createdAt: true,
                tenant: {
                    select: { name: true }
                },
                enrollments: {
                    select: {
                        course: {
                            select: {
                                tenant: {
                                    select: { name: true }
                                }
                            }
                        }
                    },
                    take: 1
                },
                _count: {
                    select: { enrollments: true }
                }
            }
        });
        return users.map(user => {
            let userTenant = user.tenant;
            if (!userTenant && user.enrollments?.length > 0) {
                userTenant = user.enrollments[0].course?.tenant;
            }
            const { enrollments, ...rest } = user;
            return {
                ...rest,
                tenant: userTenant
            };
        });
    }
    async createUser(data, currentUser) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                role: data.role || 'STUDENT',
                gradeLevel: data.gradeLevel,
                password: hashedPassword,
                tenantId: currentUser?.role === 'TEACHER' ? currentUser.tenantId : undefined
            }
        });
    }
    async getAllCourses(currentUser) {
        const where = {};
        if (currentUser && currentUser.role === 'TEACHER') {
            where.tenantId = currentUser.tenantId;
        }
        return this.prisma.course.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { enrollments: true, lessons: true }
                }
            }
        });
    }
    async getTenantCourses(tenantId) {
        return this.prisma.course.findMany({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { enrollments: true, lessons: true }
                }
            }
        });
    }
    async manageEnrollment(userId, courseId, action) {
        if (action === 'enroll') {
            return this.prisma.enrollment.create({
                data: {
                    userId,
                    courseId
                }
            });
        }
        else {
            return this.prisma.enrollment.deleteMany({
                where: {
                    userId,
                    courseId
                }
            });
        }
    }
    async getTeacherRequests() {
        return this.prisma.teacherRequest.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }
    async approveTeacherRequest(requestId) {
        const request = await this.prisma.teacherRequest.findUnique({
            where: { id: requestId }
        });
        if (!request) {
            throw new Error('Request not found');
        }
        if (request.status !== 'PENDING') {
            throw new Error('Request already processed');
        }
        const subdomain = request.domain.toLowerCase().replace(/[^a-z0-9-]/g, '');
        const tenant = await this.prisma.tenant.create({
            data: {
                name: request.name,
                subdomain: subdomain,
                mobileNumber: request.phone,
                subject: request.subject,
                grades: request.grades,
                isActive: false
            }
        });
        const user = await this.prisma.user.create({
            data: {
                name: request.name,
                email: request.email,
                phone: request.phone,
                password: request.password,
                role: 'TEACHER',
                tenantId: tenant.id
            }
        });
        await this.prisma.teacherRequest.update({
            where: { id: requestId },
            data: { status: 'APPROVED' }
        });
        return { user, tenant };
    }
    async rejectTeacherRequest(requestId, reason) {
        return this.prisma.teacherRequest.update({
            where: { id: requestId },
            data: {
                status: 'REJECTED',
                adminNotes: reason
            }
        });
    }
    async activateTenant(tenantId, startDate, endDate) {
        return this.prisma.tenant.update({
            where: { id: tenantId },
            data: {
                isActive: true,
                subscriptionStart: startDate,
                subscriptionEnd: endDate
            }
        });
    }
    async deactivateTenant(tenantId) {
        return this.prisma.tenant.update({
            where: { id: tenantId },
            data: {
                isActive: false
            }
        });
    }
    async getAllTenants() {
        return this.prisma.tenant.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { users: true, courses: true }
                }
            }
        });
    }
    async createInstructor(data) {
        try {
            console.log('Admin creating instructor:', data);
            const subdomain = data.domain?.toLowerCase().replace(/[^a-z0-9-]/g, '') || '';
            if (!subdomain) {
                throw new Error('Invalid subdomain provided');
            }
            const existingTenant = await this.prisma.tenant.findUnique({ where: { subdomain } });
            if (existingTenant) {
                throw new Error('Subdomain already taken');
            }
            const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
            if (existingUser) {
                throw new Error('Email already registered');
            }
            const tenant = await this.prisma.tenant.create({
                data: {
                    name: data.name,
                    subdomain: subdomain,
                    mobileNumber: data.phone,
                    subject: data.subject,
                    grades: (data.grades || []),
                    isActive: true
                }
            });
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await this.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    password: hashedPassword,
                    role: 'TEACHER',
                    tenantId: tenant.id
                }
            });
            return { user, tenant };
        }
        catch (error) {
            console.error('Error in createInstructor:', error);
            throw error;
        }
    }
    async deleteTenant(tenantId) {
        await this.prisma.enrollment.deleteMany({ where: { user: { tenantId } } });
        await this.prisma.quizResult.deleteMany({ where: { user: { tenantId } } });
        await this.prisma.quiz.deleteMany({ where: { lesson: { course: { tenantId } } } });
        await this.prisma.lessonProgress.deleteMany({ where: { user: { tenantId } } });
        await this.prisma.walletTransaction.deleteMany({ where: { user: { tenantId } } });
        await this.prisma.lesson.deleteMany({ where: { course: { tenantId } } });
        await this.prisma.course.deleteMany({ where: { tenantId } });
        await this.prisma.user.deleteMany({ where: { tenantId } });
        return this.prisma.tenant.delete({ where: { id: tenantId } });
    }
    async factoryReset() {
        await this.prisma.enrollment.deleteMany({});
        await this.prisma.quizResult.deleteMany({});
        await this.prisma.quiz.deleteMany({});
        await this.prisma.lessonProgress.deleteMany({});
        await this.prisma.walletTransaction.deleteMany({});
        await this.prisma.lesson.deleteMany({});
        await this.prisma.course.deleteMany({});
        await this.prisma.teacherRequest.deleteMany({});
        await this.prisma.user.deleteMany({
            where: {
                role: { not: 'SUPER_ADMIN' }
            }
        });
        await this.prisma.tenant.deleteMany({});
        return { message: 'Platform data has been completely wiped, except for Super Admin.' };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map