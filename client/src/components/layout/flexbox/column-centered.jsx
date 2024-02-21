import Box from "@mui/material/Box";

export default function ColumnCentered({
  children,
  centerHorizontal = true,
  centerVertical = true,
  sx = {},
}) {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "column",
        justifyContent: centerVertical ? "center" : "normal",
        alignItems: centerHorizontal ? "center" : "normal",
      }}
    >
      {children}
    </Box>
  );
}
