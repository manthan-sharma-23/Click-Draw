import axios from "axios";
import { BACKEND_URL } from "../../../../utils/config/config.app";
import { Task } from "../../types/models";

export const getCreatedTasks = async ({ token }: { token: string }) => {
  const result = await axios.get(`${BACKEND_URL}/v1/tasks/list`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });

  if (!result || !result.data) return null;

  const data = result.data as Task[];

  return data;
};
