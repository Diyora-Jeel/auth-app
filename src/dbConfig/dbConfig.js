// import {PrismaClient} from "@prisma/client";

// const prisma = new PrismaClient({
//     log:["query"]
// })

// export default prisma

// dbConfig.js
import { PrismaClient } from '@prisma/client';
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;