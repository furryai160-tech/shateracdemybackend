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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = __importDefault(require("stripe"));
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    configService;
    prisma;
    stripe;
    constructor(configService, prisma) {
        this.configService = configService;
        this.prisma = prisma;
        const secretKey = this.configService.get('STRIPE_SECRET_KEY');
        if (secretKey) {
            this.stripe = new stripe_1.default(secretKey, {
                apiVersion: '2024-06-20',
            });
        }
        else {
            console.warn('STRIPE_SECRET_KEY not configured');
        }
    }
    async createCheckoutSession(userId, courseId) {
        const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
        if (!this.stripe) {
            console.warn('Stripe not configured. Using Mock Checkout.');
            return {
                url: `${frontendUrl}/enroll/success?session_id=mock_session_${Date.now()}&course_id=${courseId}&mock=true`
            };
        }
        const course = await this.prisma.course.findUnique({ where: { id: courseId } });
        if (!course) {
            throw new common_1.BadRequestException('Course not found');
        }
        if (Number(course.price) === 0) {
            return { url: `${frontendUrl}/enroll/success?course_id=${courseId}&free=true` };
        }
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: course.title,
                            description: course.description?.substring(0, 255),
                            images: course.thumbnail ? [course.thumbnail] : [],
                        },
                        unit_amount: Math.round(Number(course.price) * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${frontendUrl}/enroll/success?session_id={CHECKOUT_SESSION_ID}&course_id=${courseId}`,
            cancel_url: `${frontendUrl}/courses/${courseId}?canceled=true`,
            metadata: {
                userId,
                courseId,
            },
        });
        return { url: session.url };
    }
    async verifySession(sessionId) {
        if (sessionId.startsWith('mock_session_')) {
            return true;
        }
        if (!this.stripe) {
            console.warn('Payment verification attempted without Stripe configuration');
            return false;
        }
        try {
            const session = await this.stripe.checkout.sessions.retrieve(sessionId);
            return session.payment_status === 'paid';
        }
        catch (error) {
            console.error('Error verifying session:', error);
            return false;
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map