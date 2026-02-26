import { PrismaService } from '../prisma/prisma.service';
export declare class PlansService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllPublic(): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        price: import("@prisma/client-runtime-utils").Decimal;
        duration: number;
        features: import("@prisma/client/runtime/client").JsonValue;
        isPopular: boolean;
    }[]>;
    findAllAdmin(): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        price: import("@prisma/client-runtime-utils").Decimal;
        duration: number;
        features: import("@prisma/client/runtime/client").JsonValue;
        isPopular: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        price: import("@prisma/client-runtime-utils").Decimal;
        duration: number;
        features: import("@prisma/client/runtime/client").JsonValue;
        isPopular: boolean;
    }>;
    create(data: {
        name: string;
        description?: string;
        price: number;
        duration: number;
        features: string[];
        isActive?: boolean;
        isPopular?: boolean;
    }): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        price: import("@prisma/client-runtime-utils").Decimal;
        duration: number;
        features: import("@prisma/client/runtime/client").JsonValue;
        isPopular: boolean;
    }>;
    update(id: string, data: Partial<{
        name: string;
        description: string;
        price: number;
        duration: number;
        features: string[];
        isActive: boolean;
        isPopular: boolean;
    }>): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        price: import("@prisma/client-runtime-utils").Decimal;
        duration: number;
        features: import("@prisma/client/runtime/client").JsonValue;
        isPopular: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        price: import("@prisma/client-runtime-utils").Decimal;
        duration: number;
        features: import("@prisma/client/runtime/client").JsonValue;
        isPopular: boolean;
    }>;
}
