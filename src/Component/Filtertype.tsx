import { Chip, Typography } from "@mui/material";
import type { filtertype } from "../Interface/globalinterface";
import { useContext } from "react";
import { TaskContext } from "../Context/Taskcontext";
import { FilterContext } from "../Context/Filtercontext";

export default function Filtertypecomponent() {
  const taskcontext: any = useContext(TaskContext);
  const filtercontext: any = useContext(FilterContext);
  const { singlestate, notdonetask, inprogress, donetask }: any = taskcontext;
  const { filterfunc }: any = filtercontext;

  const filterarray: filtertype[] = [
    { data: donetask, label: "Done" },
    { data: inprogress, label: "Inprogress" },
    { data: notdonetask, label: "Not done" },
    { data: singlestate.Task.length, label: "All" },
  ];

  return filterarray.map((item: filtertype, index: number) => (
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
      onClick={() => filterfunc(index + 1)}
    />
  ));
}
