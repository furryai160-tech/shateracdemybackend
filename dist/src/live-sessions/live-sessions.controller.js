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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveSessionsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const live_sessions_service_1 = require("./live-sessions.service");
let LiveSessionsController = class LiveSessionsController {
    liveSessionsService;
    constructor(liveSessionsService) {
        this.liveSessionsService = liveSessionsService;
    }
    create(body, req) {
        const teacherId = req.user.userId || req.user.id;
        const tenantId = req.user.tenantId;
        return this.liveSessionsService.create({ ...body, teacherId, tenantId, scheduledAt: body.scheduledAt });
    }
    findAll(req) {
        const tenantId = req.user.tenantId;
        return this.liveSessionsService.findAll(tenantId);
    }
    async findOne(id, req) {
        const tenantId = req.user.tenantId;
        return this.liveSessionsService.getSession(id, tenantId);
    }
    startSession(id, req) {
        const teacherId = req.user.userId || req.user.id;
        const tenantId = req.user.tenantId;
        const role = req.user.role;
        return this.liveSessionsService.startSession(id, teacherId, tenantId, role);
    }
    endSession(id, req) {
        const teacherId = req.user.userId || req.user.id;
        const tenantId = req.user.tenantId;
        const role = req.user.role;
        return this.liveSessionsService.endSession(id, teacherId, tenantId, role);
    }
    async generateToken(id, req) {
        const tenantId = req.user.tenantId;
        const session = await this.liveSessionsService.getSession(id, tenantId);
        const role = (req.user.role === 'TEACHER' || req.user.userId === session.teacherId) ? 'publisher' : 'subscriber';
        const roomId = session.roomId || session.id;
        return {
            token: this.liveSessionsService.generateAgoraTokenStr(roomId, role, req.user.userId),
            roomId: roomId,
            uid: req.user.userId
        };
    }
};
exports.LiveSessionsController = LiveSessionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LiveSessionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LiveSessionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LiveSessionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/start'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LiveSessionsController.prototype, "startSession", null);
__decorate([
    (0, common_1.Patch)(':id/end'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LiveSessionsController.prototype, "endSession", null);
__decorate([
    (0, common_1.Post)(':id/token'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LiveSessionsController.prototype, "generateToken", null);
exports.LiveSessionsController = LiveSessionsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('live-sessions'),
    __metadata("design:paramtypes", [live_sessions_service_1.LiveSessionsService])
], LiveSessionsController);
//# sourceMappingURL=live-sessions.controller.js.map