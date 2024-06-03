import { BACKEND_URL } from "@/utils/config/env";
import axios from "axios";
import { Submission } from "../../types/app.types";

export const postSubmissionTask = async ({
  token,
  optionId,
  taskId,
}: {
  optionId: string;
  taskId: number;
  token: string;
}) => {
  try {
    const result = await axios.post(
      `${BACKEND_URL}/v1/submission/submit`,
      { optionId, taskId },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    const data: Submission = result.data;

    return data;
  } catch (error) {
    return null;
  }
};
