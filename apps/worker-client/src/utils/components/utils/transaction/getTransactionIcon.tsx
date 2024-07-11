import { Transaction } from "../../../../lib/core/types/app.types";
import { FiArrowDownRight } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";

const TransactionIcon = ({ transaction }: { transaction?: Transaction }) => {
  const type = transaction?.transaction_type;
  if (type === "DEPOSIT")
    return <FiArrowDownRight className="text-green-500 text-xl" />;

  return <FiArrowUpRight className="text-red-500 text-xl" />;
};

export default TransactionIcon;
