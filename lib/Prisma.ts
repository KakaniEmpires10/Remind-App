import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  Prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.Prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.Prisma = prisma;
