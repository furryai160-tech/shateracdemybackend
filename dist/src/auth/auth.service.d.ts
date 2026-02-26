import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private prisma;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
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
    createTeacherRequest(dto: any): Promise<{
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
}
