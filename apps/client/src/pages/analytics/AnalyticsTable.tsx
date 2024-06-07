import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/lib/core/types/models";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const AnalyticsTable = ({ tasks }: { tasks: Task[] }) => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full">
      <Table>
        <TableCaption className="mt-5 mb-2 text-violet-600">
          <Link to="/create-task" className="hover:underline">
            End of task lists , create more tasks!
          </Link>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">Sno.</TableHead>
            <TableHead className="w-[100px]">Task Id</TableHead>
            <TableHead>Task title</TableHead>
            <TableHead>Task Status</TableHead>
            <TableHead>No. of Options</TableHead>
            <TableHead>No. of Workers</TableHead>
            <TableHead>No. of Responses</TableHead>
            <TableHead>Funded Lamports</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow
              className="cursor-pointer hover:bg-blue-200/60 hover:text-blue-600 transition-all"
              onClick={() => navigate(`/task/${task.id}`)}
            >
              <TableCell className="font-semibold">{index + 1}</TableCell>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.options?.length}</TableCell>
              <TableCell>{task.worker}</TableCell>
              <TableCell>{task.responses}</TableCell>
              <TableCell>{task.funds}</TableCell>
              <TableCell className="text-right">
                {moment(task.createdAt).fromNow()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnalyticsTable;
