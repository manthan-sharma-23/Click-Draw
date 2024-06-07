import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Submission } from "../types/app.types";
import { getSubmissionById } from "../server_calls/submission/get-submission-byid";

export const useGetSubmissionById = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token && submissionId) {
      setLoading(true);
      getSubmissionById({ token, id: submissionId })
        .then((data) => {
          setSubmission(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setSubmission(null);
          setLoading(false);
        });
    }
  }, [token, submissionId]);

  return { submission, loading };
};
