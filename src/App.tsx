import SunnyIcon from "@mui/icons-material/Sunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PieChartIcon from "@mui/icons-material/PieChart";
import { useLocation, useNavigate } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  Alert,
  AppBar,
  Box,
  IconButton,
  Modal,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
  useColorScheme,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { TaskContext } from "./Context/Taskcontext";
import ListmanageEditcomponent from "./Listmanage/ListmanageEdit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function App() {
  const { mode, setMode } = useColorScheme();
  const context: any = useContext(TaskContext);
  const { initialdata, Togglemodal, Taskmangastate, Togglesnackbar } = context;
  const toggletheme = () => setMode(mode === "light" ? "dark" : "light");
  const navigate = useNavigate();

  const PageTitle = () => {
    const location = useLocation();
    const title =
      location.pathname
        .replace(/^\//, "")
        .replace(/^\w/, (c) => c.toUpperCase()) || "Dashboard";
    return title;
  };

  useEffect(() => {
    initialdata();
  }, []);

  return (
    <>
      <AppBar color="warning">
        <Toolbar
          variant="dense"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h5">{PageTitle()}</Typography>
          <Box>
            <Tooltip title="Add Task">
              <IconButton
                onClick={() =>
                  Togglemodal(
                    {
                      userId: 0,
                      id: 0,
                      title: "",
                      describtion: "",
                      completed: false,
                      datestart: "",
                      dateend: "",
                      progress: 0,
                      expanded: false,
                    },
                    true
                  )
                }
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Graph">
              <IconButton onClick={() => navigate("/")}>
                <PieChartIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Task">
              <IconButton onClick={() => navigate("todolist")}>
                <AssignmentIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={mode === "light" ? "dark mode" : "light mode"}>
              <IconButton onClick={toggletheme}>
                {mode === "light" ? <DarkModeIcon /> : <SunnyIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Modal
        open={Taskmangastate.openmodal}
        onClose={() =>
          Togglemodal(
            {
              userId: 0,
              id: 0,
              title: "",
              describtion: "",
              completed: false,
              datestart: "",
              dateend: "",
              progress: 0,
              expanded: false,
            },
            false
          )
        }
        sx={{
          minWidth: "300px",
          margin: "auto",
          height: "fit-content",
          width: "fit-content",
          maxHeight: "calc(100% - 10px)",
          maxWidth: "calc(100% - 10px)",
        }}
      >
        <Box>
          <ListmanageEditcomponent />
        </Box>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={Taskmangastate.opensnackbar}
        autoHideDuration={3000}
        onClose={() => Togglesnackbar(false)}
        key={"topcenter"}
      >
        <Alert
          onClose={() => Togglesnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          <Typography variant="body1"> Completed.</Typography>
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
