import useScrollTrigger from "@mui/material/useScrollTrigger";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Fab from "@mui/material/Fab";

import KeyboardArrowUpIcon from "~icons/ic/round-keyboard-arrow-up";

export default function ReturnToTop({
  anchorId = "#back-to-top-anchor", //#id of the element which acts as an anchor for the screen to jump to
  size = "small", //Size prop of the Fab used for the icon
  threshold = 100, //Change trigger value when vertical scroll strictly crosses this threshold (exclusive)
  bidirectional = false, //disable hysteresis, which will ignore scroll direction when determining trigger value
}) {
  const trigger = useScrollTrigger({
    threshold,
    disableHysteresis: bidirectional,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      anchorId
    );

    anchor?.scrollIntoView({
      block: "center",
    });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation" //remove an element's implicit ARIA semantics from being exposed to the accessibility tree
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <Fab size={size} aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  );
}
