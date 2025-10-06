import { Box, Pagination, Stack, TextField, useTheme } from "@mui/material";
import { TaskContext } from "../Context/Taskcontext";
import { useContext } from "react";
import Taskloadingskeletoncomponent from "../Component/Taskloadingskeleton";
import Dataemptycomponent from "../Component/Dataempty";
import Taskcardcomponent from "../Component/Taskcardcomponent";
import type { filterobjecttype, Task } from "../Interface/globalinterface";
import { FilterContext } from "../Context/Filtercontext";
import Filtertypecomponent from "../Component/Filtertype";

export default function Listmanagecomponent() {
  const taskcontext: any = useContext(TaskContext);
  const filtercontext: any = useContext(FilterContext);
  const {
    singlestate,
    notdonetaskarray,
    inprogresstaskarray,
    donetaskarray,
  }: any = taskcontext;
  const { filtersinglestate, setfiltersinglestate, search }: any =
    filtercontext;

  const senddataarray = (): Task[] => {
    if (filtersinglestate.selectfilter === 1 && donetaskarray.length > 0) {
      return donetaskarray;
    } else if (
      filtersinglestate.selectfilter === 2 &&
      inprogresstaskarray.length > 0
    ) {
      return inprogresstaskarray;
    } else if (
      filtersinglestate.selectfilter === 3 &&
      notdonetaskarray.length > 0
    ) {
      return notdonetaskarray;
    } else if (
      filtersinglestate.selectfilter === 4 &&
      singlestate.Task.length > 0
    ) {
      return singlestate.Task;
    } else {
      return singlestate.Task;
    }
  };

  const theme = useTheme();
  const backgroundwhite = theme.palette.background.paper;
  const taskPerPage: number = 25;

  const currentTasks: Task[] = senddataarray().slice(
    (filtersinglestate.page - 1) * taskPerPage,
    filtersinglestate.page * taskPerPage
  );

  return (
    <Box sx={{ padding: "130px 8px 20px 8px" }}>
      <Stack
        sx={{ marginBottom: "8px" }}
        direction={"row"}
        justifyContent={"center"}
        gap={1}
        flexWrap={"wrap"}
      >
        <Filtertypecomponent />
        <TextField
          label="Search title"
          type="search"
          variant="outlined"
          size="small"
          onChange={(e: any) => search(e.target.value)}
        />
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
          <Stack
            sx={{
              height: "calc(100vh - 375px)",
              justifyContent: "center",
            }}
          >
            <Dataemptycomponent />
          </Stack>
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
          page={filtersinglestate.page}
          onChange={(_e: React.ChangeEvent<unknown>, v: number) =>
            setfiltersinglestate((prev: filterobjecttype) => ({
              ...prev,
              page: v,
            }))
          }
          showFirstButton
          showLastButton
          color="primary"
        />
      )}
    </Box>
  );
}
