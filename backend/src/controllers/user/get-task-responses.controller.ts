import { Request, Response } from "express";
import database from "../../db";

export const get_task_responses_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = Number(req.user?.userId);
    const taskId = Number(req.query.taskId);

    if (!userId || !taskId) {
      return res.sendStatus(305);
    }

    const task = await database.task.findFirst({
      where: {
        userId,
        id: taskId,
      },
    });

    if (!task) return res.status(404).json({ message: "No task" });

    const responses = await database.submission.findMany({
      where: {
        taskId: task.id,
      },
    });

    const result = {};
  } catch (error) {
    return res.status(500).json(error);
  }
};
