import { BACKEND_URL } from "@/utils/config/env";
import axios from "axios";
import { Task } from "../../types/app.types";

export const getTaskById = async ({
  taskId,
  token,
}: {
  taskId: string;
  token: string;
}) => {
  try {
    const result = await axios(`${BACKEND_URL}/v1/tasks/${taskId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    const data: Task = result.data;

    return data;
  } catch (error) {
    return null;
  }
};
