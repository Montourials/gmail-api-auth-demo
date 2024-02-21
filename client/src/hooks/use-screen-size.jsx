import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function useScreenSize() {
  const theme = useTheme();

  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const sm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const md = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const lg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const xl = useMediaQuery(theme.breakpoints.up("xl"));

  return {
    xs, // 0 - 599px
    sm, // 600 - 899px
    md, // 900 - 1199px
    lg, // 1200 - 1535px
    xl, // 1536+

    small: xs || sm, // 0 - 899px
    medium: sm || md, // 900 - 1199px
    large: lg || xl, // 1200+
  };
}
