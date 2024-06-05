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

const AnalyticsTable = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="h-full w-full">
      <Table>
        <TableCaption>A list of your created tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sno.</TableHead>
            <TableHead className="w-[100px]">Task Id</TableHead>
            <TableHead>Task title</TableHead>
            <TableHead>Task Status</TableHead>
            <TableHead>No. of Options</TableHead>
            <TableHead>No. of Workers</TableHead>
            <TableHead>No. of Responses</TableHead>
            <TableHead className="text-right">Funded Lamports</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow className="cursor-pointer">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.options.length}</TableCell>
              <TableCell>{task.worker}</TableCell>
              <TableCell>{task.responses}</TableCell>
              <TableCell className="text-right">{task.funds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnalyticsTable;
