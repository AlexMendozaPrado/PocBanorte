import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#382929",
    },
    background: {
      default: "#181111",
      paper: "#382929",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#b89d9f",
    },
    divider: "#382929",
  },
  typography: {
    fontFamily: '"Spline Sans","Noto Sans",sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "9999px",
          backgroundColor: "#382929",
          color: "#FFFFFF",
          textTransform: "none",
          '&:hover': {
            backgroundColor: "#4b3a3a",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "9999px",
          backgroundColor: "#382929",
          color: "#FFFFFF",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          backgroundColor: "#382929",
        },
      },
    },
  },
});

export default theme;

