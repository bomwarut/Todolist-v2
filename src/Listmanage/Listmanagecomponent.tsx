import {
  Box,
  Chip,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { TaskContext } from "../Context/Taskcontext";
import { useContext, useState } from "react";
import Taskloadingskeletoncomponent from "../Component/Taskloadingskeleton";
import Dataemptycomponent from "../Component/Dataempty";
import Taskcardcomponent from "../Component/Taskcardcomponent";
import type { filtertype, Task } from "../Interface/globalinterface";

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

  const senddataarray = (): Task[] => {
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

  const theme = useTheme();
  const backgroundwhite = theme.palette.background.paper;
  const [selectfilter, setselectfilter] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const taskPerPage: number = 25;
  const filterarray: filtertype[] = [
    { data: donetask, label: "Done" },
    { data: inprogress, label: "Inprogress" },
    { data: notdonetask, label: "Not done" },
    { data: singlestate.Task.length, label: "All" },
  ];

  const currentTasks: Task[] = senddataarray().slice(
    (page - 1) * taskPerPage,
    page * taskPerPage
  );
  const filter = (type: number): void => {
    if (type !== selectfilter) {
      setselectfilter(type);
      setPage(1);
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
        {filterarray.map((item: filtertype, index: number) => (
          <Chip
            icon={
              <Typography
                variant="body2"
                color="white"
                sx={{ marginLeft: "8px !important" }}
              >
                {item.data}
              </Typography>
            }
            label={item.label}
            color={
              index === 0
                ? "success"
                : index === 1
                ? "warning"
                : index === 2
                ? "error"
                : "default"
            }
            sx={{ color: "white" }}
            onClick={() => filter(index + 1)}
          />
        ))}
      </Stack>
      <Stack
        mb={20}
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap={1}
      >
        {singlestate.loading ? (
          <Taskloadingskeletoncomponent />
        ) : singlestate.Task?.length > 0 ? (
          <Taskcardcomponent data={currentTasks} disabled={false} />
        ) : (
          <Dataemptycomponent />
        )}
      </Stack>
      {singlestate.Task.length > 0 && (
        <Pagination
          sx={{
            padding: "10px",
            backgroundColor: backgroundwhite,
            width: "100%",
            position: "fixed",
            bottom: 0,
            display: "flex",
            justifyContent: "center",
          }}
          count={Math.ceil(senddataarray().length / 25)}
          page={page}
          onChange={(_e: React.ChangeEvent<unknown>, v: number) => setPage(v)}
          showFirstButton
          showLastButton
          color="primary"
        />
      )}
    </Box>
  );
}
