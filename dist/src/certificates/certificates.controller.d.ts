import { CertificatesService } from './certificates.service';
import { GenerateCertificateDto } from './dto/generate-certificate.dto';
export declare class CertificatesController {
    private readonly certificatesService;
    constructor(certificatesService: CertificatesService);
    generate(req: any, generateCertificateDto: GenerateCertificateDto): Promise<{
        message: string;
        url: string;
        date: Date;
    }>;
    findAll(req: any): Promise<{
        id: string;
        courseName: any;
        date: any;
        url: string;
    }[]>;
}
