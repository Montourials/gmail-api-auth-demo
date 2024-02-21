import { Container, Paper } from "@mui/material";

import { ReturnToTop } from "src/components/__index.js";

export default function PageContainer({ children }) {
  return (
    <Container
      sx={{
        height: "100vh",
        pt: 0.75,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          px: 2,
          py: 1.5,
          my: 0.25,
          textAlign: "center",
          height: "max-content",
        }}
      >
        <div id="app-page-container">{children}</div>
      </Paper>
      <ReturnToTop />
    </Container>
  );
}
