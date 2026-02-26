"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let VideoService = class VideoService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async getPlaybackInfo(videoId, provider) {
        const isYoutubeUrl = typeof videoId === 'string' && (videoId.includes('youtube.com') || videoId.includes('youtu.be'));
        if (isYoutubeUrl) {
            provider = 'YOUTUBE';
        }
        const isGoogleDrive = typeof videoId === 'string' && videoId.includes('drive.google.com');
        if (isGoogleDrive) {
            const previewUrl = videoId.replace(/\/view.*$/, '/preview');
            return {
                url: previewUrl,
                provider: 'BUNNY'
            };
        }
        switch (provider) {
            case 'VDOCIPHER':
                return this.getVdocipherOtp(videoId);
            case 'BUNNY':
                return this.getBunnySignature(videoId);
            case 'LOCAL':
                return {
                    url: `${this.configService.get('API_URL') || 'http://localhost:4000'}/uploads/${videoId.split('/').pop()}`,
                    provider: 'LOCAL'
                };
            case 'YOUTUBE':
                let ytId = videoId;
                if (typeof videoId === 'string' && videoId.includes('http')) {
                    const match = videoId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
                    if (match && match[1]) {
                        ytId = match[1];
                    }
                }
                return {
                    videoId: ytId,
                    url: `https://www.youtube.com/embed/${ytId}?rel=0`,
                    provider: 'YOUTUBE'
                };
            default:
                throw new Error('Invalid video provider');
        }
    }
    async getVdocipherOtp(videoId) {
        const secret = this.configService.get('VDOCIPHER_SECRET');
        if (!secret) {
            console.warn('VDOCIPHER_SECRET not configured');
            return { error: 'Vdocipher not configured' };
        }
        return {
            otp: 'mock_otp_' + Date.now(),
            playbackInfo: 'mock_playback_info_' + videoId,
            provider: 'VDOCIPHER'
        };
    }
    async getBunnySignature(videoId) {
        const key = this.configService.get('BUNNY_API_KEY');
        if (!key) {
            console.warn('BUNNY_API_KEY not configured, using fallback video');
            return {
                url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
                provider: 'LOCAL'
            };
        }
        const libraryId = this.configService.get('BUNNY_LIBRARY_ID') || '12345';
        return {
            url: `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?token=mock_token`,
            provider: 'BUNNY'
        };
    }
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], VideoService);
//# sourceMappingURL=video.service.js.map