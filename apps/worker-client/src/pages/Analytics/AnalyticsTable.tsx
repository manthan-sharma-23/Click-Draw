import { Submission } from "@/lib/core/types/app.types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/utils/components/ui/table";
import moment from "moment";
import TransactionIcon from "../../utils/components/utils/transaction/getTransactionIcon";
import { useNavigate } from "react-router-dom";

const AnalyticsTable = ({ submissions }: { submissions: Submission[] }) => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full mt-5">
      <Table className="border">
        <TableCaption>
          {submissions.length > 0
            ? "A list of your submissions"
            : "You haven't done any submission"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sno.</TableHead>
            <TableHead>Task Title</TableHead>
            <TableHead>TaskId</TableHead>
            <TableHead>Option Serial</TableHead>
            <TableHead>Option</TableHead>
            <TableHead>Amount Incomming (lamports)</TableHead>
            <TableHead>Transaction Id</TableHead>
            <TableHead className="text-right">Submitted At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission, index) => (
            <TableRow
              onClick={() => navigate(`/submission/${submission.id}`)}
              className="cursor-pointer hover:bg-yellow-50 transition-all"
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{submission.task.title}</TableCell>
              <TableCell>{submission.taskId}</TableCell>
              <TableCell>{submission.option.serial_no}</TableCell>
              <TableCell>
                <img src={submission.option.image_url} height={70} width={70} />
              </TableCell>
              <TableCell>
                {submission.transaction && (
                  <div className="flex gap-2 items-center justify-center">
                    {submission.transaction?.amount || 0}
                    <TransactionIcon transaction={submission.transaction} />
                  </div>
                )}
              </TableCell>
              <TableCell>{submission.transaction?.id || ""}</TableCell>
              <TableCell className="text-right">
                {moment(submission.createdAt).fromNow()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnalyticsTable;
