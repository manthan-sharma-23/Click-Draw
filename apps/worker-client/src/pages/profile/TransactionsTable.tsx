import useGetTransactions from "@/lib/core/hooks/useGetTransactions.ts";
import { Alert, CircularProgress } from "@mui/material";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/utils/components/ui/table";
import TransactionIcon from "@/utils/components/utils/transaction/getTransactionIcon";
import moment from "moment";
import { cn } from "@/utils";

const TransactionsTable = () => {
  const { err, transactions, loading } = useGetTransactions();

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (err) {
    return (
      <Alert color="error" severity="error">
        {err}
      </Alert>
    );
  }
  return (
    <div className="w-full h-full ">
      <Table className="border">
        <TableCaption>A list of your wallet transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sno.</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Transaction Status</TableHead>
            <TableHead>Transaction Type</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">Post Wallet Balance</TableHead>
            <TableHead className="text-center font-medium">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell
                className={cn(
                  "font-medium",
                  transaction.status === "SUCCESS"
                    ? "text-green-500"
                    : transaction.status === "PROCESSING"
                      ? "text-yellow-600"
                      : "text-red-500"
                )}
              >
                {transaction.status}
              </TableCell>
              <TableCell className="font-medium">
                {transaction.transaction_type}
              </TableCell>
              <TableCell>{transaction.from || "N/A"}</TableCell>
              <TableCell>{transaction.to || "Wallet"}</TableCell>
              <TableCell className="text-right flex justify-center items-center gap-2">
                <p>{transaction.amount}</p>
                <TransactionIcon transaction={transaction} />
              </TableCell>
              <TableCell>{transaction.post_balance}</TableCell>
              <TableCell>
                {moment(transaction.createdAt).format("LLL")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
