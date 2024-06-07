import { BACKEND_URL } from "@/utils/config/env";
import axios from "axios";
import { Submission } from "../../types/app.types";

export const getSubmissionById = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/v1/submission/${id}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    const data = result.data as Submission;

    return data;
  } catch (error) {
    return null;
  }
};
