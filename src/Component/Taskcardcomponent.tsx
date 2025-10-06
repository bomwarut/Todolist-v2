import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Stack,
  styled,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import type { ExpandMoreProps, Task } from "../Interface/globalinterface";
import CircularProgressWithLabel from "./Circularwithtext";
import { useContext } from "react";
import { TaskContext } from "../Context/Taskcontext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Taskcardcomponent(props: any) {
  const { data, disabled } = props;

  const context: any = useContext(TaskContext);
  const {
    Taskmangastate,
    Selectask,
    Togglemodal,
    Expandcard,
    ToggleTaskstatus,
  } = context;

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: "rotate(0deg)",
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: "rotate(180deg)",
        },
      },
    ],
  }));

  return data.map((item: Task, index: number) => (
    <Card key={index} sx={{ width: "300px", height: "fit-content" }}>
      <CardActionArea
        disabled={disabled}
        onClick={() => Selectask(item)}
        data-active={Taskmangastate.selectedCard === item.id ? "" : undefined}
        sx={{
          height: "100%",
          "&[data-active]": {
            backgroundColor: "action.selected",
            "&:hover": {
              backgroundColor: "action.selectedHover",
            },
          },
        }}
      >
        <CardContent sx={{ height: "100%", padding: "4px" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Tooltip title="Edit">
              <IconButton
                size="small"
                disabled={disabled}
                color={item.completed ? "success" : "error"}
                onClick={() => Togglemodal(item, true)}
              >
                <CircularProgressWithLabel
                  sizes="normal"
                  colors={
                    item.progress === 0
                      ? "error"
                      : item.progress === 100
                      ? "success"
                      : "warning"
                  }
                  value={item.progress}
                />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {item.title}
            </Typography>
            <ExpandMore
              disabled={disabled}
              expand={item.expanded}
              onClick={() => Expandcard(item)}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Stack>
        </CardContent>
        <Collapse in={item.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>{item.describtion}</Typography>
          </CardContent>
        </Collapse>
        { !disabled &&
          <CardActions>
            <Tooltip title="Done / Not done">
              <Switch
                sx={{ marginLeft: "auto" }}
                checked={item.completed}
                color="success"
                onChange={() => ToggleTaskstatus(item)}
              />
            </Tooltip>
          </CardActions>
        }
      </CardActionArea>
    </Card>
  ));
}
