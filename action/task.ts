"use server";

import { prisma } from "@/lib/Prisma";
import { createTaskSchemaType } from "@/schema/createTaskSchema";
import { currentUser } from "@clerk/nextjs";

export const createTask = async (value: createTaskSchemaType) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User Not Found");
  }

  const { collectionId, content, expiresAt } = value;

  return await prisma.task.create({
    data: {
      userId: user.id,
      content,
      expiresAt,
      Collection: {
        connect: {
          id: collectionId,
        },
      },
    },
  });
};

export async function setTaskToDone(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User Not Found");
  }

  return await prisma.task.update({
    where : {
      id : id,
      userId : user.id
    },
    data : {
      done : true
    }
  })
}
