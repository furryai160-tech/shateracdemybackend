"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function getEnv(key) {
    const envPath = path.resolve(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf-8');
        const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
        if (match) {
            let val = match[1].trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            return val;
        }
    }
    return process.env[key];
}
async function main() {
    const connectionString = getEnv('DATABASE_URL');
    if (!connectionString) {
        console.error('DATABASE_URL not found');
        return;
    }
    const pool = new pg_1.Pool({ connectionString });
    const adapter = new adapter_pg_1.PrismaPg(pool);
    const prisma = new client_1.PrismaClient({ adapter });
    try {
        const tenant = await prisma.tenant.findFirst();
        console.log('Testing with Tenant ID:', tenant?.id);
        if (!tenant) {
            console.log('No tenants found. Testing with undefined tenantId (Admin mode)');
        }
        const tenantId = tenant?.id;
        console.log('--- Simulating getPendingRequests ---');
        const where = { type: 'DEPOSIT', status: 'PENDING' };
        if (tenantId) {
            where.user = {
                OR: [
                    { tenantId: tenantId },
                    { tenantId: null }
                ]
            };
        }
        console.log('Query where:', JSON.stringify(where, null, 2));
        const results = await prisma.walletTransaction.findMany({
            where,
            include: {
                user: {
                    select: { id: true, name: true, email: true, phone: true, tenantId: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        console.log('Results found:', results.length);
        results.forEach((r) => {
            console.log(`- Request ${r.id}: User ${r.user.email} (Tenant: ${r.user.tenantId})`);
        });
        const missing = await prisma.walletTransaction.findFirst({
            where: {
                user: { email: 'furryai160@gmail.com' }
            },
            include: { user: true }
        });
        if (missing) {
            console.log('\n--- Debugging missing user ---');
            console.log('Found transaction:', missing.id);
            console.log('Status:', missing.status);
            console.log('Type:', missing.type);
            console.log('User TenantId:', missing.user.tenantId);
        }
        if (results.length === 0) {
            console.log('WARNING: No results found!');
            const allPending = await prisma.walletTransaction.count({ where: { type: 'DEPOSIT', status: 'PENDING' } });
            console.log('Total PENDING DEPOSIT requests in DB (ignoring filters):', allPending);
        }
        console.log('\n--- ALL USERS ---');
        const allUsers = await prisma.user.findMany();
        allUsers.forEach((u) => {
            console.log(`- ${u.email} (Tenant: ${u.tenantId}, Role: ${u.role})`);
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=test_query.js.map