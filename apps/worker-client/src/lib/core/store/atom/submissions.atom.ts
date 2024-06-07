import { atom } from "recoil";
import { SubmissionsByWorker } from "../../types/app.types";

export const SubmissionsAtom = atom({
  key: "submission/atom/key/default/worker",
  default: null as SubmissionsByWorker | null,
});
