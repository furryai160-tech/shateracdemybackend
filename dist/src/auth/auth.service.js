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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    usersService;
    jwtService;
    prisma;
    constructor(usersService, jwtService, prisma) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async validateUser(email, pass) {
        if (!email || typeof email !== 'string' || !pass || typeof pass !== 'string') {
            return null;
        }
        const user = await this.usersService.findOne(email);
        if (user && user.password && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { username: user.email, sub: user.id, role: user.role, tenantId: user.tenantId };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                parentPhone: user.parentPhone,
                governorate: user.governorate,
                role: user.role,
                tenantId: user.tenantId,
                gradeLevel: user.gradeLevel,
            },
        };
    }
    async register(registerDto) {
        const user = await this.usersService.findOne(registerDto.email);
        if (user) {
            throw new common_1.UnauthorizedException('User already exists');
        }
        const { subdomain, ...userData } = registerDto;
        if (subdomain) {
            const tenant = await this.prisma.tenant.findUnique({
                where: { subdomain: subdomain.toLowerCase() }
            });
            if (tenant) {
                userData.tenantId = tenant.id;
            }
        }
        return this.usersService.create(userData);
    }
    async createTeacherRequest(dto) {
        console.log('Received Teacher Request:', dto);
        const existingUser = await this.usersService.findOne(dto.email);
        if (existingUser) {
            console.log('User already exists');
            throw new common_1.BadRequestException('User with this email already exists');
        }
        const existingRequest = await this.prisma.teacherRequest.findUnique({
            where: { email: dto.email }
        });
        if (existingRequest) {
            console.log('Request already exists');
            throw new common_1.BadRequestException('A request with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        try {
            return await this.prisma.teacherRequest.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    phone: dto.phone,
                    password: hashedPassword,
                    subject: dto.subject,
                    grades: dto.grades,
                    domain: dto.domain,
                    idCardUrl: dto.idCardUrl,
                    serviceType: dto.serviceType
                }
            });
        }
        catch (error) {
            console.error('Error creating teacher request:', error);
            throw new common_1.BadRequestException('Validation failed: ' + error.message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map