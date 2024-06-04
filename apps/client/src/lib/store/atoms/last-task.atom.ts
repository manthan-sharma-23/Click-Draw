import { Option, Task } from "@/lib/core/types/models";
import { atom } from "recoil";

export const LastTaskByUserAtom = atom({
  key: "last/key/atom/default/atom/key",
  default: null as {
    task: Task;
    result: { option: Option; percentage: number }[];
  } | null,
});
