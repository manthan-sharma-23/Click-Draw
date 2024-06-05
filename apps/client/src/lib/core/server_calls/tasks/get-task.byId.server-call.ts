import { BACKEND_URL } from "@/utils/config/config.app";
import axios from "axios";
import { TaskResult } from "../../types/models";

export const getTaskById = async ({
  taskId,
  token,
}: {
  taskId: number;
  token: string;
}) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/v1/tasks/result/${taskId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    const data = result.data as TaskResult;

    return data;
  } catch (error) {
    return error as string;
  }
};
