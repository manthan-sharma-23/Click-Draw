import useGetTaskById from "@/lib/hooks/useGetTaskById";
import { Alert, Avatar, CircularProgress } from "@mui/material";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { OptionStatistics, Task } from "@/lib/core/types/models";
import { cn } from "@/lib/utils";
import { LineChart } from "@mui/x-charts/LineChart";

const TaskByIdPage = () => {
  const { task, loading, error } = useGetTaskById();

  if (loading) {
    return (
      <div className="h-full w-full">
        <CircularProgress size={25} />
      </div>
    );
  }

  if (error || !task) {
    return (
      <Alert variant="filled" color="error">
        {error}
      </Alert>
    );
  }

  return (
    <div className="h-full w-full oveflow-x-hidden flex flex-col items-center font-poppins justify-start pt-6">
      <div className="w-full h-auto flex gap-2 items-center justify-center">
        <div className="w-2/3 h-auto">
          <p className="w-full h-auto text-5xl font-semibold">
            {task.task.title}
          </p>
          {task.task.description && (
            <p className="mt-3 w-full h-auto text-3xl font-normal text-black/60">
              {task.task.description}
            </p>
          )}
        </div>
        <div className="w-1/3 h-full"></div>
      </div>
      <div className="w-full h-auto flex justify-center items-center mt-6">
        <div className="w-2/3 h-full ">
          <Graph result={task.result} />
        </div>
        <div className="w-1/3 h-full font-sans flex flex-col justify-center items-start gap-3">
          <p>Funds: {task.task.funds} (lamports)</p>
          <p>Responses: {task.task.responses}</p>
          <p>Status: {task.task.status}</p>
          <p>Options: {task.task.options?.length}</p>
          <p>Created At: {moment(task.task.createdAt).format("LLL")}</p>
          <p>Created By Id: {task.task.userId}</p>

          <Link
            className="text-violet-600 underline"
            to={`https://explorer.solana.com/tx/${task.task.signature}?cluster=devnet`}
          >
            View Transaction
          </Link>
        </div>
      </div>
      <div className="mt-6 w-full h-auto">
        <Poll result={task.result} />
      </div>
      <div className="mt-6 w-full h-auto">
        <SubmissionTable task={task.task} />
      </div>
    </div>
  );
};

const Graph = ({ result }: { result: OptionStatistics[] }) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <LineChart
        xAxis={[{ data: result.map((res) => res.option.serial_no) }]}
        series={[
          {
            area: true,
            color: "#003362",
            curve: "catmullRom",
            data: result.map((res) => res.percentage),
          },
        ]}
        width={700}
        height={400}
      />
    </div>
  );
};

const Poll = ({ result }: { result: OptionStatistics[] }) => {
  return (
    <div className="mt-6 w-full h-auto ">
      <p className="text-4xl font-medium">Poll</p>
      <Table className="border mt-5 overflow-x-hidden">
        <TableCaption>A list of your recent submissions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10px]">Sno.</TableHead>
            <TableHead className="w-[500px]">OptionId</TableHead>
            <TableHead className="w-[400px]">Option Data</TableHead>
            <TableHead>Votes</TableHead>
            <TableHead className="text-right">Percentage Votes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((result, index) => (
            <TableRow key={index} className="relative z-10 overflow-x-hidden">
              <div
                className={cn("absolute h-full -z-10 bg-blue-200/60 ")}
                style={{
                  width: String(result.percentage.toFixed()) + "%",
                }}
              />
              <TableCell className="font-medium">
                {result.option.serial_no}
              </TableCell>
              <TableCell className="font-medium">{result.option.id}</TableCell>
              <TableCell>
                <img src={result.option.image_url} height={200} width={200} />
              </TableCell>
              <TableCell className="font-medium">{result.votes}</TableCell>
              <TableCell className="font-medium text-right">
                {result.percentage.toFixed() + "%"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const SubmissionTable = ({ task }: { task: Task }) => {
  return (
    <div className="w-full h-auto mb-[10rem] mt-5">
      <p className="w-full h-auto text-4xl font-medium">Submissions</p>
      <Table className="border mt-5">
        <TableCaption>A list of your recent submissions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sno.</TableHead>
            <TableHead>WorkerId</TableHead>
            <TableHead>OptionId</TableHead>
            <TableHead>Option Serial No.</TableHead>
            <TableHead>Option Data</TableHead>
            <TableHead>Credited</TableHead>
            <TableHead className="text-right">Submitted At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {task.submissions?.map((submission, index) => (
            <TableRow>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{submission.workerId}</TableCell>
              <TableCell>{submission.optionId}</TableCell>
              <TableCell>{submission.option.serial_no}</TableCell>
              <TableCell>
                <Avatar src={submission.option.image_url} />
              </TableCell>
              <TableCell>{submission.amount_credited_to_worker}</TableCell>
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

export default TaskByIdPage;
