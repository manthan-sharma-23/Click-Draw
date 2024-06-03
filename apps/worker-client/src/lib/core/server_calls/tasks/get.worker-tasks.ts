import { BACKEND_URL } from "@/utils/config/env";
import axios from "axios";
import { Task } from "../../types/app.types";

export const getWorkerTasks = async ({ token }: { token: string }) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/v1/worker/tasks`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    const data = result.data as Task[];

    return data;
  } catch (error) {
    console.log("error");
    return [];
  }
};
