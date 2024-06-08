import { BACKEND_URL } from "@/utils/config/env";
import axios from "axios";
import { Transaction } from "../../types/app.types";

export const putPayoutWallet = async ({
  token,
  address,
}: {
  token: string;
  address: string;
}) => {
  try {
    const result = await axios.put(
      `${BACKEND_URL}/v1/wallet/pay-out`,
      { address },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    const data = result.data as { tx: Transaction; message: string };

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
