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

const AnalyticsTable = ({ submissions }: { submissions: Submission[] }) => {
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
            <TableHead>Amount Incomming</TableHead>
            <TableHead>Transaction Id</TableHead>
            <TableHead className="text-right">Submitted At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission, index) => (
            <TableRow>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{submission.task.title}</TableCell>
              <TableCell>{submission.taskId}</TableCell>
              <TableCell>{submission.option.serial_no}</TableCell>
              <TableCell>{submission.option.image_url}</TableCell>
              <TableCell>{submission.transaction.amount}</TableCell>
              <TableCell>{submission.transaction.id}</TableCell>
              <TableCell className="text-right">
                {moment(submission.createdAt).format("LL")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnalyticsTable;
