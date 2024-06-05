import { useRecoilState } from "recoil";
import { UserAtom } from "../store/atoms/user.atom";
import { useEffect, useState } from "react";
import { getUserServerCall } from "../core/server_calls/users/getUser.server-call";

const useGetUser = () => {
  const [user, setUser] = useRecoilState(UserAtom);
  const [isLoading, setIsLoading] = useState(false);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      getUserServerCall({ token })
        .then((data) => {
          if (data) {
            setUser(data);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [token]);

  return { loading: isLoading, user };
};

export default useGetUser;
