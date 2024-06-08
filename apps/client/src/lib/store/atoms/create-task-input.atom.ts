import { atom } from "recoil";

export interface CreateTaskInput {
  funds: number;
  title: string;
  description: string;
  worker: number;
  signature: string;
  useWallet: boolean;
}

export const CreateTaskAtom = atom({
  key: "/create/atom/key/input",
  default: { worker: 15, useWallet: false } as CreateTaskInput,
});
