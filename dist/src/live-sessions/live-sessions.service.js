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
exports.LiveSessionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const agora_token_1 = require("agora-token");
let LiveSessionsService = class LiveSessionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.liveSession.create({
            data: {
                title: data.title,
                description: data.description,
                courseId: data.courseId,
                teacherId: data.teacherId,
                tenantId: data.tenantId,
                scheduledAt: new Date(data.scheduledAt),
            },
        });
    }
    async findAll(tenantId) {
        return this.prisma.liveSession.findMany({
            where: { tenantId },
            include: {
                course: { select: { title: true } },
                teacher: { select: { name: true } },
            },
            orderBy: { scheduledAt: 'asc' },
        });
    }
    async getSession(id, tenantId) {
        const session = await this.prisma.liveSession.findUnique({
            where: { id },
            include: { teacher: true, course: true },
        });
        if (!session || session.tenantId !== tenantId)
            throw new common_1.NotFoundException('Session not found');
        return session;
    }
    async startSession(id, teacherId, tenantId, userRole) {
        const session = await this.getSession(id, tenantId);
        if (session.teacherId !== teacherId && userRole !== 'SUPER_ADMIN') {
            console.warn(`[Dev Warning] Teacher mismatch bypassed - Session: ${session.teacherId}, Requester: ${teacherId}, Role: ${userRole}`);
        }
        const roomId = `room_${session.id}`;
        return this.prisma.liveSession.update({
            where: { id },
            data: {
                status: 'LIVE',
                roomId: roomId,
            },
        });
    }
    async endSession(id, teacherId, tenantId, userRole) {
        const session = await this.getSession(id, tenantId);
        if (session.teacherId !== teacherId && userRole !== 'SUPER_ADMIN') {
            console.warn(`[Dev Warning] Teacher mismatch bypassed during endSession`);
        }
        return this.prisma.liveSession.update({
            where: { id },
            data: {
                status: 'ENDED',
            },
        });
    }
    generateAgoraTokenStr(channelName, role, userAccount) {
        const appId = "18e2610f7681483b89eb2f46a2990cdd";
        const appCertificate = "81b1306ba5d5418ea61c0761dc9ed669";
        if (!appId || !appCertificate) {
            throw new Error('Agora keys not configured in backend');
        }
        const expirationTimeInSeconds = 3600 * 2;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        const agoraRole = role === 'publisher' ? agora_token_1.RtcRole.PUBLISHER : agora_token_1.RtcRole.SUBSCRIBER;
        const token = agora_token_1.RtcTokenBuilder.buildTokenWithUserAccount(appId, appCertificate, channelName, userAccount, agoraRole, expirationTimeInSeconds, privilegeExpiredTs);
        return token;
    }
};
exports.LiveSessionsService = LiveSessionsService;
exports.LiveSessionsService = LiveSessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LiveSessionsService);
//# sourceMappingURL=live-sessions.service.js.map