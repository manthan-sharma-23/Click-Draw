import axios from "axios";
import { BACKEND_URL } from "../../../../utils/config/config.app";
import { CreateTaskInput } from "../../../store/atoms/create-task-input.atom";
import { Task } from "../../types/models";

export const CreateTaskInServer = async ({
  files,
  task,
}: {
  files: File[];
  task: CreateTaskInput;
}) => {
  try {
    const formData = new FormData();
    const data = task;
    formData.append("data", JSON.stringify(data));

    files.forEach((file) => {
      formData.append("files", file);
    });
    const res = await axios.post(
      `${BACKEND_URL}/v1/tasks/create-task`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data as Task;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
