import { Skeleton, Stack } from "@mui/material";

export default function Dashboardloadingskeletoncomponent() {
  return (
    <Stack direction={"column"} gap={"20px"} sx={{ width: "fit-content" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={2}
        sx={{ width: "fit-content" }}
      >
        <Skeleton variant="circular" width={200} height={200} />
        <Stack direction={"column"}>
          <Skeleton variant="rounded" width={200} height={32} />
          <br />
          <Stack direction={"row"}>
            <Skeleton variant="rounded" width={200} height={32} />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={2}
        sx={{ width: "fit-content" }}
      >
        <Skeleton variant="circular" width={200} height={200} />
        <Stack direction={"column"}>
          <Skeleton variant="rounded" width={200} height={32} />
          <br />
          <Stack direction={"row"}>
            <Skeleton variant="rounded" width={200} height={32} />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={2}
        sx={{ width: "fit-content" }}
      >
        <Skeleton variant="circular" width={200} height={200} />
        <Stack direction={"column"}>
          <Skeleton variant="rounded" width={200} height={32} />
          <br />
          <Stack direction={"row"}>
            <Skeleton variant="rounded" width={200} height={32} />
          </Stack>
        </Stack>
      </Stack>
      <Skeleton variant="rounded" width={200} height={32} />
    </Stack>
  );
}
