import { createTheme } from "@mui/material";

export const AppTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#222222", // Lighter shade of the primary color
      main: "#000000", // Main primary color
      dark: "#111111", // Darker shade of the primary color
      contrastText: "#fff", // Text color on primary color
    },
    secondary: {
      main: "#3f51b5",
      light: "rgb(101, 115, 195)",
      contrastText: "#fff",
      dark: "rgb(44, 56, 126)",
    },
  },
});
