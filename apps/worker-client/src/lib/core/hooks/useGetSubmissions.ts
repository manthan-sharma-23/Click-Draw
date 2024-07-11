import { useEffect, useState } from "react";
import { getSubmissionsByWorker } from "../server_calls/submission/get-submissions-by-worker";
import { useRecoilState } from "recoil";
import { SubmissionsAtom } from "../store/atom/submissions.atom";

const useGetSubmissions = () => {
  const [submissions, setSubmissions] = useRecoilState(SubmissionsAtom);
  const [loading, setLoading] = useState(false);

  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setLoading(true);
      getSubmissionsByWorker({ token })
        .then((data) => {
          console.log(data);
          if (data) {
            setSubmissions(data);
          } else {
            setSubmissions(null);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setSubmissions(null);
        });
    }
  }, [token]);

  return { submissions, loading };
};

export default useGetSubmissions;
