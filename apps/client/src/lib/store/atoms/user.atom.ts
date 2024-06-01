import { atom } from "recoil";
import { User } from "../../core/types/models";

export const UserAtom = atom({
  key: "user/state/key/atom",
  default: null as User | null,
});
