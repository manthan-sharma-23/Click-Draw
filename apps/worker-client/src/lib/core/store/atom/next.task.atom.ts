import { atom } from "recoil";
import { Task } from "../../types/app.types";

export const NextTaskAtom = atom({
  key: "atom/next/task/default/storage",
  default: null as Task | null,
});
