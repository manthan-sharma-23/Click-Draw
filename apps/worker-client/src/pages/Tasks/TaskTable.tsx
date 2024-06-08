import { Task } from "@/lib/core/types/app.types";
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
import { useNavigate } from "react-router-dom";

const TaskTable = ({ tasks }: { tasks: Task[] }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-auto">
      <Table className="border">
        <TableCaption>
          {tasks.length > 0
            ? "A list of your pending tasks"
            : "No Tasks for you right now , come back later   : ) "}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sno.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>No. of Options</TableHead>
            <TableHead>No. of Worker</TableHead>
            <TableHead>No. of Responses</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>End At</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow
              key={task.id}
              className="hover:bg-black/5 cursor-pointer"
              onClick={() => navigate(`/task/${task.id}`)}
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.options?.length}</TableCell>
              <TableCell>{task.worker}</TableCell>
              <TableCell>{task.responses}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell className="text-right">
                {moment(task.endAt).format("lll")}
              </TableCell>
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

export default TaskTable;
