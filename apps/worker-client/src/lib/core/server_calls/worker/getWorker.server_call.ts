import { BACKEND_URL } from "@/utils/config/env";
import axios from "axios";
import { Worker } from "../../types/app.types";

export const getWorkerFromDb = async ({ token }: { token: string }) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/v1/worker/`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    const data: Worker = result.data;

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
