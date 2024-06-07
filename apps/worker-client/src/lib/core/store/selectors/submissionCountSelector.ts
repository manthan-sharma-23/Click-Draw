import { selector } from "recoil";
import { SubmissionsAtom } from "../atom/submissions.atom";
import { WorkerAtom } from "../atom/worker.atom";

export const SubmissionByWorkerSelector = selector({
  key: "selctor/submissions/worker/key",
  get: ({ get }) => {
    const submissions = get(SubmissionsAtom);
    const wallet = get(WorkerAtom)?.wallet;

    return {
      submissions_today: submissions?.submissionCountForDay,
      total_submissions: submissions?.submissionTotalCount,
      wallet_balance: wallet?.currentAmount,
    };
  },
});
