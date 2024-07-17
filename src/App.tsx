import { Container, CssBaseline, Stack, Switch, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import PasswordGenerator from "./PasswordGenerator";

const App = () => {
  const [mode, setMode] = useState("dark");
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#1e202a",
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#ffffff",
      },
    },
  });

  const selectedTheme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Stack direction="row" alignItems="center" justifyContent="end" sx={{ my: 3 }}>
          <Switch onChange={() => setMode(mode === "light" ? "dark" : "light")} checked={mode === "dark"} />
          <Typography>{mode === "dark" ? "Koyu Mod" : "Açık Mod"}</Typography>
        </Stack>
        <PasswordGenerator />
      </Container>
    </ThemeProvider>
  );
};

export default App;
