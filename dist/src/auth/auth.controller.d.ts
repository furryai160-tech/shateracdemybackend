import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: any): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            phone: any;
            parentPhone: any;
            governorate: any;
            role: any;
            tenantId: any;
            gradeLevel: any;
        };
    }>;
    register(registerDto: any): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        phone: string | null;
        parentPhone: string | null;
        governorate: string | null;
        gradeLevel: string | null;
        role: import("@prisma/client").$Enums.Role;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
        walletBalance: import("@prisma/client-runtime-utils").Decimal;
    }>;
    teacherRequest(dto: any): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        subject: string;
        grades: import("@prisma/client/runtime/client").JsonValue;
        domain: string;
        idCardUrl: string;
        serviceType: import("@prisma/client").$Enums.ServiceType;
        status: import("@prisma/client").$Enums.RequestStatus;
        adminNotes: string | null;
    }>;
    getProfile(req: any): any;
}
