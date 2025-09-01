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
      disabled: "rgba(255, 255, 255, 0.3)",
    },
    error: {
      main: "#FF4D4D",
    },
    divider: "#382929",
    action: {
      hover: "#4b3a3a",
      disabledBackground: "#533c3d",
    },
  },
  typography: {
    fontFamily: '"Gotham","Spline Sans","Noto Sans",sans-serif',
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
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            fontFamily: theme.typography.fontFamily,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.action.hover,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.text.primary,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
            color: theme.palette.text.disabled,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        }),
        input: ({ theme }) => ({
          '&::placeholder': {
            color: theme.palette.text.secondary,
            opacity: 1,
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.secondary,
          fontFamily: theme.typography.fontFamily,
          '&.Mui-focused': {
            color: theme.palette.text.primary,
          },
          '&.Mui-error': {
            color: theme.palette.error.main,
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
          },
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.secondary,
          fontFamily: theme.typography.fontFamily,
          '&.Mui-error': {
            color: theme.palette.error.main,
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
          },
        }),
      },
    },
  },
});

export default theme;

