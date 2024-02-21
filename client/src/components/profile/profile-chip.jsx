import Chip from "@mui/material/Chip";
import AccountCircleIcon from "~icons/ic/account-circle";

export default function ProfileChip({
  label,
  icon,
  variant = "filled",
  ...props
}) {
  return (
    <Chip
      icon={icon ?? <AccountCircleIcon />}
      label={label ?? "label"}
      variant={variant}
      {...props}
    />
  );
}
