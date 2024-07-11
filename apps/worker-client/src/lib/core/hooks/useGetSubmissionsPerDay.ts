import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSubmissionPerDay } from "../server_calls/submission/get-submission-per-day,server-call";

const useGetSubmissionsPerDay = () => {
  const [submissionsPerDay, setSubmissionsPerDay] = useState<
    { date: Date; submissionCount: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setLoading(true);
      getSubmissionPerDay({ token })
        .then((data) => {
          if (data) {
            setSubmissionsPerDay(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setSubmissionsPerDay([]);
          setLoading(false);
        });
    }
  }, [pathname, token]);

  return { submissionsPerDay, loading };
};

export default useGetSubmissionsPerDay;
