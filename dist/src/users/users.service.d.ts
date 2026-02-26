import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<User>;
    findOne(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<{
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
        walletBalance: Prisma.Decimal;
    }[]>;
}
