import Button from "@mui/material/Button";

export default function BasicButton({ handleClick, text = "Text", ...props }) {
  const defaultSx = { width: "50%" };
  const sx = props.sx ? { ...defaultSx, ...props.sx } : defaultSx;

  return (
    <Button {...props} onClick={handleClick} sx={sx}>
      {text}
    </Button>
  );
}
