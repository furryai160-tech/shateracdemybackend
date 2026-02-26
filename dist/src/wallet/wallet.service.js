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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WalletService = class WalletService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBalance(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        const walletBalance = user.walletBalance;
        return {
            balance: walletBalance ? Number(walletBalance) : 0,
        };
    }
    async requestDeposit(userId, amount, proofUrl) {
        return this.prisma.walletTransaction.create({
            data: {
                userId,
                amount,
                type: 'DEPOSIT',
                status: 'PENDING',
                proofUrl,
            },
            include: { user: false },
        });
    }
    async getTransactions(userId) {
        return this.prisma.walletTransaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getPendingRequests(user) {
        console.log('getPendingRequests called with user:', user);
        const where = { type: 'DEPOSIT' };
        if (user.role !== 'SUPER_ADMIN' && user.tenantId) {
        }
        else if (user.role === 'SUPER_ADMIN') {
        }
        else if (!user.tenantId) {
        }
        console.log('Querying with where:', JSON.stringify(where, null, 2));
        const results = await this.prisma.walletTransaction.findMany({
            where,
            include: {
                user: {
                    select: { id: true, name: true, email: true, phone: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        console.log('Found requests:', results.length);
        return results;
    }
    async approveRequest(requestId) {
        const transaction = await this.prisma.walletTransaction.findUnique({ where: { id: requestId } });
        if (!transaction || transaction.status !== 'PENDING') {
            throw new common_1.BadRequestException('Invalid or already processed request');
        }
        await this.prisma.walletTransaction.update({
            where: { id: requestId },
            data: { status: 'APPROVED' },
        });
        await this.prisma.user.update({
            where: { id: transaction.userId },
            data: { walletBalance: { increment: transaction.amount } },
        });
        return { message: 'Wallet credited successfully' };
    }
    async rejectRequest(requestId, reason) {
        await this.prisma.walletTransaction.update({
            where: { id: requestId },
            data: { status: 'REJECTED', adminNote: reason },
        });
        return { message: 'Request rejected' };
    }
    async payForCourse(userId, courseId) {
        console.log(`[Wallet.pay] userId=${userId}, courseId=${courseId}`);
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        const course = await this.prisma.course.findUnique({ where: { id: courseId } });
        if (!course)
            throw new common_1.BadRequestException('Course not found');
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const userBalance = Number(user.walletBalance ?? 0);
        const coursePrice = Number(course.price ?? 0);
        if (userBalance < coursePrice) {
            throw new common_1.BadRequestException(`رصيد غير كافٍ. رصيدك: ${userBalance} ج.م، سعر الكورس: ${coursePrice} ج.م`);
        }
        const existing = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId } }
        });
        if (existing)
            throw new common_1.BadRequestException('أنت مسجّل بالفعل في هذا الكورس');
        await this.prisma.user.update({
            where: { id: userId },
            data: { walletBalance: { decrement: coursePrice } },
        });
        await this.prisma.walletTransaction.create({
            data: {
                userId,
                amount: coursePrice,
                type: 'PURCHASE',
                status: 'APPROVED',
                courseId,
            },
        });
        await this.prisma.enrollment.create({
            data: {
                userId,
                courseId,
            },
        });
        return { message: 'تم الشراء بنجاح' };
    }
    async adminCredit(adminUser, targetUserId, amount) {
        if (adminUser.role !== 'SUPER_ADMIN' && adminUser.role !== 'ADMIN' && adminUser.role !== 'TEACHER') {
            throw new common_1.BadRequestException('ليس لديك صلاحية تنفيذ هذا الإجراء');
        }
        if (!targetUserId || !amount || amount <= 0) {
            throw new common_1.BadRequestException('بيانات غير صحيحة');
        }
        const target = await this.prisma.user.findUnique({ where: { id: targetUserId } });
        if (!target)
            throw new common_1.BadRequestException('الطالب غير موجود');
        await this.prisma.user.update({
            where: { id: targetUserId },
            data: { walletBalance: { increment: amount } },
        });
        await this.prisma.walletTransaction.create({
            data: {
                userId: targetUserId,
                amount,
                type: 'DEPOSIT',
                status: 'APPROVED',
                adminNote: `شحن مباشر من الأدمن (${adminUser.username})`,
            },
        });
        return { message: `تم شحن ${amount} ج.م لحساب ${target.name || target.email} بنجاح` };
    }
    async setVodafoneCashNumber(userId, number) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        if (!user.tenantId)
            throw new common_1.BadRequestException('User is not a tenant admin');
        await this.prisma.tenant.update({
            where: { id: user.tenantId },
            data: { vodafoneCashNumber: number }
        });
        return { message: 'تم تحديث الرقم بنجاح' };
    }
    async getVodafoneCashNumber(tenantId) {
        if (!tenantId) {
            const tenant = await this.prisma.tenant.findFirst();
            return { number: tenant?.vodafoneCashNumber || '' };
        }
        const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
        return { number: tenant?.vodafoneCashNumber || '' };
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map