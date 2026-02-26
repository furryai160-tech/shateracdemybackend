import { CanActivate, ExecutionContext } from '@nestjs/common';
import { EnrollmentsService } from '../../enrollments/enrollments.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CourseAccessGuard implements CanActivate {
    private prisma;
    private enrollmentsService;
    constructor(prisma: PrismaService, enrollmentsService: EnrollmentsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
