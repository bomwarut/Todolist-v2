import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing/Routing.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import TodoProvider from "./Context/Taskcontext.tsx";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <TodoProvider>
          <CssBaseline />
          <App />
          <Routing />
        </TodoProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
