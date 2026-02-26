import { LiveSessionsService } from './live-sessions.service';
export declare class LiveSessionsController {
    private readonly liveSessionsService;
    constructor(liveSessionsService: LiveSessionsService);
    create(body: {
        title: string;
        description?: string;
        courseId: string;
        scheduledAt: string;
    }, req: any): Promise<any>;
    findAll(req: any): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    startSession(id: string, req: any): Promise<any>;
    endSession(id: string, req: any): Promise<any>;
    generateToken(id: string, req: any): Promise<{
        token: string;
        roomId: any;
        uid: any;
    }>;
}
