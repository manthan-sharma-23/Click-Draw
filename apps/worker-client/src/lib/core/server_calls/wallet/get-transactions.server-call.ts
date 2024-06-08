import { BACKEND_URL } from "@/utils/config/env";
import axios from "axios";
import { Transaction } from "../../types/app.types";

export const getWalletTransactions = async ({ token }: { token: string }) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/v1/wallet/transactions`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    const data = result.data as Transaction[];

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
