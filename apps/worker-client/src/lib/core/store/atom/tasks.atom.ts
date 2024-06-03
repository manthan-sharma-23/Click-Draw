import { atom } from "recoil";
import { Task } from "../../types/app.types";

export const TasksAtom = atom({
  key: "atom/tasks/key/store",
  default: [] as Task[],
});
