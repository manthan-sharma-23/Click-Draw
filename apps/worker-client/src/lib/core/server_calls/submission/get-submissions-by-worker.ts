import { BACKEND_URL } from "@/utils/config/env";
import axios from "axios";
import { SubmissionsByWorker } from "../../types/app.types";

export const getSubmissionsByWorker = async ({ token }: { token: string }) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/v1/submission`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    const data = result.data as SubmissionsByWorker;

    return data;
  } catch (error) {
    return null;
  }
};
