import { useRecoilState } from "recoil";
import { UserAtom } from "../store/atoms/user.atom";
import { useEffect } from "react";
import { getCreatedTasks } from "../core/server_calls/tasks/get-tasks-created.server-call";

const useGetUser = () => {
  const [user, setUser] = useRecoilState(UserAtom);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getCreatedTasks({ token }).then(data=>{
        if(data){
            setUser
        }
      });
    }
  }, [token]);

  return user;
};

export default useGetUser;
