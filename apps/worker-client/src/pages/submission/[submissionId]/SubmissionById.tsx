import { useGetSubmissionById } from "@/lib/core/hooks/useGetSubmissionById";
import { cn } from "@/utils";
import { Separator } from "@/utils/components/ui/separator";
import TransactionIcon from "@/utils/components/utils/transaction/getTransactionIcon";
import _ from "lodash";
import moment from "moment";

const SubmissionById = () => {
  const { submission } = useGetSubmissionById();

  return (
    <div className="h-full w-full flex flex-col justify-start items-start">
      <div className="w-full h-auto mt-5  flex justify-center items-center">
        <div className="w-3/4 flex justify-center ">
          <div className="w-1/2 h-auto ">
            <div className="w-full h-full flex flex-col gap-3 ">
              <p className="text-4xl font-semibold text-black/70 mb-3 font-poppins ">
                Submission
              </p>
              <div className="flex gap-3">
                <p className="font-medium">Task Id:</p>
                <p>{submission?.taskId}</p>
              </div>
              <div className="flex gap-3">
                <p className="font-medium">Option Serial:</p>
                <p>{submission?.option.serial_no}</p>
              </div>
              <div className="flex gap-3">
                <p className="font-medium">Submitted at:</p>
                <p>{moment(submission?.createdAt).format("LLL")}</p>
              </div>
              <div className="flex gap-3">
                <p className="font-medium">Amount Incomming:</p>
                <p className="flex gap-3 items-center justify-center">
                  {submission?.transaction?.amount}
                  <TransactionIcon transaction={submission?.transaction} />
                </p>
              </div>
            </div>
          </div>
          <Separator
            orientation="vertical"
            className="border-darkblue bg-black "
          />
          <div className="w-1/2 h-auto">
            <div className="w-full h-full flex flex-col gap-3">
              <p className="text-4xl font-semibold text-black/70 mb-3 font-poppins ">
                Transaction
              </p>
              <div className="flex gap-3">
                <p className="font-medium">Transaction Id:</p>
                <p>{submission?.transactionId}</p>
              </div>
              <div className="flex gap-3">
                <p className="font-medium">Submission Id:</p>
                <p>{submission?.id}</p>
              </div>

              <div className="flex gap-3">
                <p className="font-medium">Option Id:</p>
                <p>{submission?.optionId}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4  p-1">
          <img src={submission?.option.image_url} />
        </div>
      </div>
      <div className="w-full  mt-7">
        <p className="text-4xl mb-6 font-semibold text-black/70 mb-3 font-poppins ">
          Task
        </p>
        <p className="text-2xl font-medium text-black">
          {submission?.task.title}
        </p>
        <p className="text-xl font-medium text-black/65 mt-3">
          {submission?.task.description}
        </p>
        <div className="flex gap-4 items-center justify-start mt-8">
          {submission?.task.options?.map((option) => {
            return (
              <div
                key={option.id}
                className={cn(
                  "hover:bg-black/5 hover:scale-105 transition-all  overflow-hidden h-[200px] w-[250px] border rounded-xl flex items-center justify-center p-2 overflow-hidden",
                  option.id === submission.optionId && "bg-green-100"
                )}
              >
                <img src={option.image_url} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubmissionById;
