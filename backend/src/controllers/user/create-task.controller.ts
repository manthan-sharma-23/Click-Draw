import { Request, Response } from "express";
import { createTaskInput } from "../../types/types";
import database from "../../db";

export const create_task_controller = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.user?.userId);

    if (!userId) return res.sendStatus(400);

    const body = req.body;

    const safeParse = createTaskInput.safeParse(body);

    if (!safeParse.success) return res.sendStatus(330);

    const response = await database.$transaction(async (tx) => {
      const response = await tx.task.create({
        data: {
          userId: userId,
          amount: "1",
          signature: safeParse.data.signature,
          title: safeParse.data.title,
        },
      });

      await tx.option.createMany({
        data: safeParse.data.options.map((x) => ({
          image_url: x.imageUrl,
          taskId: response.id,
        })),
      });

      return response;
    });

    return res.json({ response_id: response.id });
  } catch (error) {
    return res.status(500).json(error);
  }
};
