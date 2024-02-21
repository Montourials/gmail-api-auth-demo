import { Typography } from "@mui/material";

///has a loader in the router which is specific to authz
export default function Redirect() {
  return (
    <Typography variant="h6">
      {"Please wait while you are redirected..."}
    </Typography>
  );
}
