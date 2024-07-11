import { useGetNextTask } from "@/lib/core/hooks/useGetNextTask";
import { postSubmissionTask } from "@/lib/core/server_calls/submission/post-submission-task";
import { getNextTask } from "@/lib/core/server_calls/worker/get.next-task.worker";
import { NextTaskAtom } from "@/lib/core/store/atom/next.task.atom";
import { Option } from "@/lib/core/types/app.types";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const GetTaskById = () => {
  const task = useRecoilValue(NextTaskAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loading } = useGetNextTask();
  const [option, setOption] = useState("");
  const navigate = useNavigate();

  if (!task) {
    return;
  }

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <CircularProgress color="secondary" size={30} />
      </div>
    );
  }

  const submitTask = () => {
    const token = window.localStorage.getItem("token");
    if (token && option && task) {
      setIsSubmitting(true);
      postSubmissionTask({ token, optionId: option, taskId: task.id })
        .then(() => {
          getNextTask({ token })
            .then((data) => {
              if (data) {
                navigate(`/task/${data.id}`);
                setIsSubmitting(false);
              } else {
                navigate("/tasks");
              }
            })
            .catch((err) => {
              console.log(err);
              setIsSubmitting(false);
            });
        })
        .catch((err) => {
          console.log(err);
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="h-full w-full  pt-5  justify-start items-start flex flex-col mb-8">
      <Typography variant="h6" fontSize={16} fontWeight={250} color={"gray"}>
        <div className="flex items-end gap-2 py-0 ">
          <p className="h-full my-0 py-0">Task</p>
          <p className="h-full">by {task.user.address}</p>
        </div>
      </Typography>
      <p className="text-3xl font-semibold mt-4">{task.title}</p>
      <p className="text-xl font-normal mt-1">{task.description}</p>
      {task && (
        <Box
          component="section"
          sx={{
            marginY: "1.5rem",
            width: "100%",
            height: "auto",
            p: 2,
            border: "1px dashed gray",
          }}
        >
          <FormControl disabled={isSubmitting}>
            <RadioGroup
              onChange={(e) => {
                setOption(e.target.value);
              }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {task.options?.map((option) => (
                <FormControlLabel
                  value={option.id}
                  control={<Radio />}
                  label={<InputOptionComponent option={option} />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      )}
      <div className="mt-3 w-full flex justify-end items-center">
        <Button
          onClick={submitTask}
          disabled={isSubmitting}
          variant="contained"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

const InputOptionComponent = ({ option }: { option: Option }) => {
  return (
    <div className="h-[10rem] w-full my-2 flex items-center justify-start">
      <img src={option.image_url} className="h-full" />
    </div>
  );
};

export default GetTaskById;
