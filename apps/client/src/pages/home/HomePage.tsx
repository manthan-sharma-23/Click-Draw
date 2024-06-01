import { Button, Input } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../../utils/config/config.app";

const HomePage = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFiles((prevFiles) => [...prevFiles, selectedFile]);
    }
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      const data = { title: "Hey there", funds: 10000 };
      formData.append("data", JSON.stringify(data));

      files.forEach((file, index) => {
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
      console.log(res.data);

      console.log("Files uploaded successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-full w-full px-10">
      <br />
      <br />
      <br />
      <p>Select a file</p>
      <Input onChange={handleFileChange} type="file" />
      <div className="flex justify-start flex-wrap">
        {files.map((file, index) => (
          <div key={index}>
            <img
              className="h-12 w-12 m-2"
              src={URL.createObjectURL(file)}
              alt={`Image ${index}`}
            />
          </div>
        ))}
      </div>
      <Button onClick={onSubmit} variant="contained">
        Create
      </Button>
    </div>
  );
};

export default HomePage;
