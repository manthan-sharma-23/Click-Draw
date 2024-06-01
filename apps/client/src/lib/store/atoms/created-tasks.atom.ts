import { atom } from "recoil";
import { Task } from "../../core/types/models";

export const CreatedTasksAtom = atom({
  key: "tasks/created/atom",
  default: [] as Task[],
});
