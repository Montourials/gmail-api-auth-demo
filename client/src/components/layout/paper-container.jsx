import { v4 as uuid } from "uuid";
import { Container, Paper } from "@mui/material";

import ReturnToTop from "./return-to-top.jsx";

export default function PaperContainer({ children, showReturnToTop = true }) {
  return (
    <Container
      sx={{
        mt: 2,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          px: 2,
          py: 1.5,
          my: 1,
          textAlign: "center",
          height: "max-content",
        }}
      >
        <div id={`paper-container-${uuid()}`}>{children}</div>
      </Paper>
      {showReturnToTop && <ReturnToTop />}
    </Container>
  );
}
