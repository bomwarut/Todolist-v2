import { Card, IconButton, Skeleton, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Taskloadingskeletoncomponent() {
  const array: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  ];
  return array.map((item: number) => (
    <Card key={item} sx={{ padding: "4px", width: "300px" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={1}
      >
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width={200} height={32} />
        <IconButton>
          <ExpandMoreIcon />
        </IconButton>
      </Stack>
    </Card>
  ));
}
