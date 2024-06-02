import { atom } from "recoil";
import { Worker } from "../../types/app.types";

export const WorkerAtom = atom({
  key: "worker/atom/key/default/v1",
  default: null as Worker | null,
});
