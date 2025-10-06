import { Box, Chip, Stack, Typography } from "@mui/material";
import { TaskContext } from "../Context/Taskcontext";
import { useContext, useState } from "react";
import Taskloadingskeletoncomponent from "../Component/Taskloadingskeleton";
import Dataemptycomponent from "../Component/Dataempty";
import Taskcardcomponent from "../Component/Taskcardcomponent";

export default function Listmanagecomponent() {
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
  const [selectfilter, setselectfilter] = useState<number>(0);
  const senddataarray = () => {
    if (selectfilter === 1 && donetaskarray.length > 0) {
      return donetaskarray;
    } else if (selectfilter === 2 && inprogresstaskarray.length > 0) {
      return inprogresstaskarray;
    } else if (selectfilter === 3 && notdonetaskarray.length > 0) {
      return notdonetaskarray;
    } else if (selectfilter === 4 && singlestate.Task.length > 0) {
      return singlestate.Task;
    } else {
      return singlestate.Task;
    }
  };

  return (
    <Box sx={{ padding: "130px 8px 20px 8px" }}>
      <Stack
        sx={{ marginBottom: "8px" }}
        direction={"row"}
        justifyContent={"center"}
        gap={1}
      >
        <Chip
          icon={
            <Typography
              variant="body2"
              color="white"
              sx={{ marginLeft: "8px !important" }}
            >
              {donetask}
            </Typography>
          }
          label="Done"
          color="success"
          sx={{ color: "white" }}
          onClick={() => setselectfilter(1)}
        />
        <Chip
          icon={
            <Typography
              variant="body2"
              color="white"
              sx={{ marginLeft: "8px !important" }}
            >
              {inprogress}
            </Typography>
          }
          label="Inprogress"
          color="warning"
          sx={{ color: "white" }}
          onClick={() => setselectfilter(2)}
        />
        <Chip
          icon={
            <Typography
              variant="body2"
              color="white"
              sx={{ marginLeft: "8px !important" }}
            >
              {notdonetask}
            </Typography>
          }
          color="error"
          label="Not done"
          sx={{ color: "white" }}
          onClick={() => setselectfilter(3)}
        />
        <Chip
          icon={
            <Typography
              variant="body2"
              sx={{ marginLeft: "8px !important" }}
            >
              {singlestate.Task.length}
            </Typography>
          }
          label="All"
          onClick={() => setselectfilter(4)}
        />
      </Stack>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap={1}
      >
        {singlestate.loading ? (
          <Taskloadingskeletoncomponent />
        ) : singlestate.Task?.length > 0 ? (
          <Taskcardcomponent data={senddataarray()} disabled={false} />
        ) : (
          <Dataemptycomponent />
        )}
      </Stack>
    </Box>
  );
}
