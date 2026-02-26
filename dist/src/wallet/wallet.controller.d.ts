import { WalletService } from './wallet.service';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    getBalance(req: any): Promise<{
        balance: number;
    }>;
    getTransactions(req: any): Promise<any>;
    getPendingRequests(req: any): Promise<any>;
    requestDeposit(req: any, amount: string, file: Express.Multer.File): Promise<any>;
    approveRequest(id: string): Promise<{
        message: string;
    }>;
    rejectRequest(id: string, reason: string): Promise<{
        message: string;
    }>;
    payForCourse(req: any, courseId: string): Promise<{
        message: string;
    }>;
    adminCredit(req: any, userId: string, amount: number): Promise<{
        message: string;
    }>;
    setVodafoneCashNumber(req: any, number: string): Promise<{
        message: string;
    }>;
    getVodafoneCashNumber(req: any): Promise<{
        number: any;
    }>;
}
