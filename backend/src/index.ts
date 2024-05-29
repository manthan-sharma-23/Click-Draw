import e from "express";

const app = e();

const PORT = 3200;

app.listen(PORT, () => {
  console.log("Server listening on PORT ${PORT}");
});
