import { VideoService } from './video.service';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
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
}
