import { Box, Stack, Typography } from "@mui/material";
import CircularProgressWithLabel from "../Component/Circularwithtext";
import { useContext } from "react";
import { TaskContext } from "../Context/Taskcontext";
import Taskloadingskeletoncomponent from "../Component/Taskloadingskeleton";
import Taskcardcomponent from "../Component/Taskcardcomponent";
import Dashboardloadingskeletoncomponent from "../Component/Dashboardloadingskeleton";
import Dataemptycomponent from "../Component/Dataempty";

export default function Dashboardcomponent() {
  const context: any = useContext(TaskContext);
  const {
    singlestate,
    notdonetask,
    inprogress,
    donetask,
    notdonetaskarray,
    inprogresstaskarray,
    donetaskarray,
  } = context;

  const total = singlestate.Task.length || 1;

  const notdonetaskpercent = (notdonetask / total) * 100;
  const inprogresspercent = (inprogress / total) * 100;
  const donetaskpercent = (donetask / total) * 100;

  return (
    <Stack
      direction={"row"}
      sx={{
        height: "100vh",
        padding: "130px 8px 8px 8px",
        width: "fit-context",
      }}
      justifyContent={"space-around"}
      alignItems={"center"}
      flexWrap={"wrap"}
    >
      {singlestate.loading ? (
        <Dashboardloadingskeletoncomponent />
      ) : singlestate.uinotfound || singlestate.Task?.length === 0 ? (
        <Dataemptycomponent />
      ) : (
        <Stack direction={"column"} gap={"20px"} sx={{ width: "fit-content" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            sx={{ width: "fit-content" }}
          >
            <CircularProgressWithLabel
              colors={"error"}
              value={notdonetaskpercent}
              sizes="large"
            />
            <Stack direction={"column"}>
              <Typography variant="h3">: Not done</Typography>
              <br />
              <Stack direction={"row"}>
                <Typography color={"error"} variant="h4">
                  {notdonetask}
                </Typography>{" "}
                &nbsp;&nbsp;
                <Typography variant="h4">Task</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            sx={{ width: "fit-content" }}
          >
            <CircularProgressWithLabel
              colors={"warning"}
              value={inprogresspercent}
              sizes="large"
            />
            <Stack direction={"column"}>
              <Typography variant="h3">: Inprogress</Typography>
              <br />
              <Stack direction={"row"}>
                <Typography color={"warning"} variant="h4">
                  {inprogress}
                </Typography>
                &nbsp;&nbsp;
                <Typography variant="h4">Task</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            sx={{ width: "fit-content" }}
          >
            <CircularProgressWithLabel
              colors={"success"}
              value={donetaskpercent}
              sizes="large"
            />
            <Stack direction={"column"}>
              <Typography variant="h3">: Done</Typography>
              <br />
              <Stack direction={"row"}>
                <Typography color={"success"} variant="h4">
                  {donetask}
                </Typography>
                &nbsp;&nbsp;
                <Typography variant="h4">Task</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Typography variant="h2" sx={{ margin: "30px auto 30px auto" }}>
            Total : {singlestate.Task?.length}
          </Typography>
        </Stack>
      )}
      <Stack
        direction={"row"}
        gap={2}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        <Box sx={{ overflow: "auto", maxHeight: " calc(100vh - 138px)" }}>
          {notdonetaskarray?.length > 0 && (
            <Typography variant="h5">Not done</Typography>
          )}
          <Stack direction={"column"} gap={1}>
            {singlestate.loading ? (
              <Taskloadingskeletoncomponent />
            ) : (
              notdonetaskarray?.length > 0 && (
                <Taskcardcomponent data={notdonetaskarray} disabled={true} />
              )
            )}
          </Stack>
        </Box>
        <Box sx={{ overflow: "auto", maxHeight: " calc(100vh - 138px)" }}>
          {inprogresstaskarray?.length > 0 && (
            <Typography variant="h5">Inprogress</Typography>
          )}
          <Stack direction={"column"} gap={1}>
            {singlestate.loading ? (
              <Taskloadingskeletoncomponent />
            ) : (
              inprogresstaskarray?.length > 0 && (
                <Taskcardcomponent data={inprogresstaskarray} disabled={true} />
              )
            )}
          </Stack>
        </Box>
        <Box sx={{ overflow: "auto", maxHeight: " calc(100vh - 138px)" }}>
          {donetaskarray?.length > 0 && (
            <Typography variant="h5">Done</Typography>
          )}
          <Stack direction={"column"} gap={1}>
            {singlestate.loading ? (
              <Taskloadingskeletoncomponent />
            ) : (
              <Taskcardcomponent data={donetaskarray} disabled={true} />
            )}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
