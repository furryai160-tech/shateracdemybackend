import { PlansService } from './plans.service';
export declare class PlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
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
    create(createPlanDto: any): Promise<{
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
    update(id: string, updateData: any): Promise<{
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
