import axios from "axios";
import { BACKEND_URL } from "../../../../utils/config/config.app";
import { Option, Task } from "../../types/models";

export const getLastTaskFromUser = async ({ token }: { token: string }) => {
  const result = await axios.get(`${BACKEND_URL}/v1/users/last-task`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });

  if (!result || !result.data) return null;

  const data = result.data as {
    task: Task;
    result: { option: Option; percentage: number }[];
  };

  return data;
};
