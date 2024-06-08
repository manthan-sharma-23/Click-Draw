import { BACKEND_URL } from "@/utils/config/env";
import axios from "axios";

export const getSubmissionPerDay = async ({ token }: { token: string }) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/v1/submission/per-day`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    const data = result.data as { date: Date; submissionCount: number }[];

    return data;
  } catch (error) {
    return null;
  }
};
