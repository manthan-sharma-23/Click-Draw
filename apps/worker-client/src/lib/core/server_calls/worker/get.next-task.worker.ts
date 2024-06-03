import { BACKEND_URL } from "@/utils/config/env";
import axios from "axios";
import { Task } from "../../types/app.types";

export const getNextTask = async ({ token }: { token: string }) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/v1/worker/next`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (!result.data) throw new Error();

    const data = result.data as Task;

    return data;
  } catch (error) {
    // throw new Error(error as string);
    console.log(error);
    return null;
  }
};
