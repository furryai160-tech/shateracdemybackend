import { PaymentsService } from './payments.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createCheckoutSession(req: any, createCheckoutSessionDto: CreateCheckoutSessionDto): Promise<{
        url: string | null;
    }>;
    verifySession(sessionId: string): Promise<boolean>;
}
