import { Typography, LinearProgress } from "@mui/material";

export default function Loading() {
  return (
    <>
      <Typography variant="h6">
        {"Please wait while we perform the requested action..."}
      </Typography>
      <Typography variant="subtitle1">
        {"This might take a while, please do not close or switch from the page"}
      </Typography>
      <LinearProgress
        variant="query"
        sx={{ maxWidth: "33%", mx: "auto", my: 2 }}
      />
    </>
  );
}
