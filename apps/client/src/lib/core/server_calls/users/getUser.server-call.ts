import { BACKEND_URL } from "@/utils/config/config.app";
import axios from "axios";
import { User } from "../../types/models";

export const getUserServerCall = async ({ token }: { token: string }) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/v1/users/`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    const data = result.data as User;

    return data;
  } catch (error) {
    return null;
  }
};
