import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Tenant } from '@prisma/client';
export declare class TenantsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.TenantCreateInput): Promise<Tenant>;
    findAll(): Promise<Tenant[]>;
    findOne(id: string): Promise<Tenant>;
    update(id: string, data: Prisma.TenantUpdateInput): Promise<Tenant>;
    findBySubdomain(subdomain: string): Promise<Tenant & {
        courses: any[];
    }>;
    findPublicTeachers(): Promise<{
        id: string;
        name: string;
        subdomain: string;
        subject: string | null;
        grades: string[];
        logoUrl: string | null;
        primaryColor: string | null;
    }[]>;
}
