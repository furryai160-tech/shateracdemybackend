"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
prisma.liveSession.findFirst({ orderBy: { createdAt: 'desc' } })
    .then(s => console.log('Latest session:', s))
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=check_db.js.map