import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getStats(req: any): Promise<{
        totalUsers: number;
        totalCourses: number;
        totalEnrollments: number;
        revenue: number;
    }>;
    getAllUsers(req: any): Promise<{
        tenant: {
            name: string;
        } | null;
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        phone: string | null;
        parentPhone: string | null;
        gradeLevel: string | null;
        role: import("@prisma/client").$Enums.Role;
        _count: {
            enrollments: number;
        };
    }[]>;
    createUser(body: any, req: any): Promise<{
        id: string;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        email: string;
        password: string;
        phone: string | null;
        parentPhone: string | null;
        governorate: string | null;
        gradeLevel: string | null;
        role: import("@prisma/client").$Enums.Role;
        walletBalance: import("@prisma/client-runtime-utils").Decimal;
    }>;
    getAllCourses(req: any): Promise<({
        _count: {
            enrollments: number;
            lessons: number;
        };
    } & {
        id: string;
        title: string;
        description: string | null;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        gradeLevel: string | null;
        thumbnail: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        isPublished: boolean;
    })[]>;
    manageEnrollment(body: {
        userId: string;
        courseId: string;
        action: 'enroll' | 'unenroll';
    }): Promise<{
        id: string;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        progress: number;
    } | import("@prisma/client").Prisma.BatchPayload>;
    getTeacherRequests(): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        phone: string;
        subject: string;
        grades: import("@prisma/client/runtime/client").JsonValue;
        domain: string;
        idCardUrl: string;
        serviceType: import("@prisma/client").$Enums.ServiceType;
        adminNotes: string | null;
    }[]>;
    approveTeacherRequest(id: string): Promise<{
        user: {
            id: string;
            tenantId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            email: string;
            password: string;
            phone: string | null;
            parentPhone: string | null;
            governorate: string | null;
            gradeLevel: string | null;
            role: import("@prisma/client").$Enums.Role;
            walletBalance: import("@prisma/client-runtime-utils").Decimal;
        };
        tenant: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            subdomain: string;
            customDomain: string | null;
            mobileNumber: string | null;
            subject: string | null;
            grades: string[];
            subscriptionStart: Date | null;
            subscriptionEnd: Date | null;
            isActive: boolean;
            logoUrl: string | null;
            primaryColor: string | null;
            theme: import("@prisma/client").$Enums.Theme;
            themeConfig: import("@prisma/client/runtime/client").JsonValue | null;
            vodafoneCashNumber: string | null;
        };
    }>;
    rejectTeacherRequest(id: string, reason: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        phone: string;
        subject: string;
        grades: import("@prisma/client/runtime/client").JsonValue;
        domain: string;
        idCardUrl: string;
        serviceType: import("@prisma/client").$Enums.ServiceType;
        adminNotes: string | null;
    }>;
    activateTenant(id: string, body: {
        start: string;
        end: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        subdomain: string;
        customDomain: string | null;
        mobileNumber: string | null;
        subject: string | null;
        grades: string[];
        subscriptionStart: Date | null;
        subscriptionEnd: Date | null;
        isActive: boolean;
        logoUrl: string | null;
        primaryColor: string | null;
        theme: import("@prisma/client").$Enums.Theme;
        themeConfig: import("@prisma/client/runtime/client").JsonValue | null;
        vodafoneCashNumber: string | null;
    }>;
    deactivateTenant(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        subdomain: string;
        customDomain: string | null;
        mobileNumber: string | null;
        subject: string | null;
        grades: string[];
        subscriptionStart: Date | null;
        subscriptionEnd: Date | null;
        isActive: boolean;
        logoUrl: string | null;
        primaryColor: string | null;
        theme: import("@prisma/client").$Enums.Theme;
        themeConfig: import("@prisma/client/runtime/client").JsonValue | null;
        vodafoneCashNumber: string | null;
    }>;
    getTenantCourses(id: string): Promise<({
        _count: {
            enrollments: number;
            lessons: number;
        };
    } & {
        id: string;
        title: string;
        description: string | null;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        gradeLevel: string | null;
        thumbnail: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        isPublished: boolean;
    })[]>;
    deleteTenant(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        subdomain: string;
        customDomain: string | null;
        mobileNumber: string | null;
        subject: string | null;
        grades: string[];
        subscriptionStart: Date | null;
        subscriptionEnd: Date | null;
        isActive: boolean;
        logoUrl: string | null;
        primaryColor: string | null;
        theme: import("@prisma/client").$Enums.Theme;
        themeConfig: import("@prisma/client/runtime/client").JsonValue | null;
        vodafoneCashNumber: string | null;
    }>;
    getAllTenants(): Promise<({
        _count: {
            users: number;
            courses: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        subdomain: string;
        customDomain: string | null;
        mobileNumber: string | null;
        subject: string | null;
        grades: string[];
        subscriptionStart: Date | null;
        subscriptionEnd: Date | null;
        isActive: boolean;
        logoUrl: string | null;
        primaryColor: string | null;
        theme: import("@prisma/client").$Enums.Theme;
        themeConfig: import("@prisma/client/runtime/client").JsonValue | null;
        vodafoneCashNumber: string | null;
    })[]>;
    createInstructor(body: any): Promise<{
        user: {
            id: string;
            tenantId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            email: string;
            password: string;
            phone: string | null;
            parentPhone: string | null;
            governorate: string | null;
            gradeLevel: string | null;
            role: import("@prisma/client").$Enums.Role;
            walletBalance: import("@prisma/client-runtime-utils").Decimal;
        };
        tenant: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            subdomain: string;
            customDomain: string | null;
            mobileNumber: string | null;
            subject: string | null;
            grades: string[];
            subscriptionStart: Date | null;
            subscriptionEnd: Date | null;
            isActive: boolean;
            logoUrl: string | null;
            primaryColor: string | null;
            theme: import("@prisma/client").$Enums.Theme;
            themeConfig: import("@prisma/client/runtime/client").JsonValue | null;
            vodafoneCashNumber: string | null;
        };
    }>;
    factoryReset(req: any): Promise<{
        message: string;
    }>;
}
