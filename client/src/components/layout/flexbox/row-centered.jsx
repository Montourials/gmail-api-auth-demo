import Box from "@mui/material/Box";

export default function RowCentered({
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
        flexDirection: "row",
        justifyContent: centerHorizontal ? "center" : "normal",
        alignItems: centerVertical ? "center" : "normal",
      }}
    >
      {children}
    </Box>
  );
}
