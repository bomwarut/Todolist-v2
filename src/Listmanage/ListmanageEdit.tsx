import {
  Box,
  useTheme,
  IconButton,
  Stack,
  Typography,
  TextField,
  Button,
  Slider,
  Input,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../Context/Taskcontext";
import CloseIcon from "@mui/icons-material/Close";

export default function ListmanageEditcomponent() {
  const theme = useTheme();
  const context: any = useContext(TaskContext);
  const backgroundwhite = theme.palette.background.paper;
  const { singlestate, Savetask, Taskmangastate, Deletetask, Togglemodal } =
    context;

  const [title, settitle] = useState<string>("");
  const [describtion, setdescribtion] = useState<string>("");
  const [progress, setprogress] = useState<number>(0);
  const [modalheader, setmodalheader] = useState<string>("");
  const disableform: boolean = !title?.toString().trim();
  const handleSliderChange = (event: Event, newValue: number) =>
    setprogress(newValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setprogress(event.target.value === "" ? 0 : Number(event.target.value));

  const submit = () =>
    Savetask(
      {
        userId: 0,
        id:
          modalheader === "Edit"
            ? Taskmangastate.Taskdata.id
            : singlestate.Task[singlestate.Task.length - 1].id + 1,
        title: title,
        describtion: describtion,
        completed: progress === 100 ? true : false,
        datestart: "",
        dateend: "",
        progress: progress,
        expanded: false,
      },
      modalheader === "Edit" ? 2 : 1
    );

  useEffect(() => {
    if (Taskmangastate.Taskdata.id !== 0) {
      settitle(Taskmangastate.Taskdata.title);
      setdescribtion(Taskmangastate.Taskdata.describtion);
      setprogress(Taskmangastate.Taskdata.progress);
    }
    setmodalheader(Taskmangastate.Taskdata.id !== 0 ? "Edit" : "Create");
  }, [Taskmangastate.openmodal]);

  return (
    <Box
      sx={{
        padding: "30px",
        background: backgroundwhite,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        {modalheader} Task
      </Typography>
      <IconButton
        sx={{ position: "absolute", top: "5px", right: "10px" }}
        onClick={() => Togglemodal(false)}
      >
        <CloseIcon />
      </IconButton>
      <Stack direction={"column"} gap={3}>
        <Stack direction={"column"} gap={3}>
          <TextField
            value={title}
            label="Title"
            required
            error={disableform}
            variant="outlined"
            multiline
            inputProps={{ maxLength: 80 }}
            maxRows={3}
            helperText={title?.length + "/80"}
            onChange={(e) => settitle(e.target.value)}
          />
          <TextField
            value={describtion}
            label="Describtion"
            variant="outlined"
            multiline
            maxRows={6}
            inputProps={{ maxLength: 200 }}
            helperText={describtion?.length + " / 200"}
            onChange={(e) => setdescribtion(e.target.value)}
          />
        </Stack>
        {modalheader === "Edit" && (
          <>
            <Typography variant="body1">Progress</Typography>
            <Stack direction={"row"} gap={3}>
              <Slider
                color="warning"
                value={progress}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
              />
              <Input
                value={progress}
                size="small"
                onChange={handleInputChange}
                inputProps={{
                  min: 0,
                  max: 100,
                  type: "number",
                }}
              />
            </Stack>
          </>
        )}
        <Stack direction={"row"} justifyContent={"space-between"}>
          {modalheader === "Edit" && (
            <Button
              color="error"
              variant="contained"
              loading={singlestate.saving}
              onClick={() => Deletetask(Taskmangastate.Taskdata)}
            >
              <Typography variant="body1">Delete</Typography>
            </Button>
          )}
          <Button
            color="success"
            variant="contained"
            loading={singlestate.saving}
            sx={{ marginLeft: "auto" }}
            onClick={submit}
            disabled={disableform}
          >
            <Typography variant="body1">Save</Typography>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
