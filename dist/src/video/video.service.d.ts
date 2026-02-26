import { ConfigService } from '@nestjs/config';
export declare class VideoService {
    private configService;
    constructor(configService: ConfigService);
    getPlaybackInfo(videoId: string, provider: 'VDOCIPHER' | 'BUNNY' | 'YOUTUBE' | 'LOCAL'): Promise<{
        error: string;
        otp?: undefined;
        playbackInfo?: undefined;
        provider?: undefined;
    } | {
        otp: string;
        playbackInfo: string;
        provider: string;
        error?: undefined;
    } | {
        url: string;
        provider: string;
        videoId?: undefined;
    } | {
        videoId: string;
        url: string;
        provider: string;
    }>;
    private getVdocipherOtp;
    private getBunnySignature;
}
