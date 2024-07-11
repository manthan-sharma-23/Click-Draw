import { useEffect, useState } from "react";
import { Transaction } from "../types/app.types";
import { getWalletTransactions } from "../server_calls/wallet/get-transactions.server-call";

const useGetTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("token");
  const [err, setErr] = useState("");
  useEffect(() => {
    if (token) {
      setLoading(true);
      getWalletTransactions({ token })
        .then((data) => {
          if (data) {
            setTransactions(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setErr(err);
        });
    }
  }, [token]);

  return { transactions, err, loading };
};

export default useGetTransactions;
