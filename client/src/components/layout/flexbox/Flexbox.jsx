import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import { cssGlobalValues } from "src/util/__index.js";

export default function Flexbox({
  children,
  justifyContent, //control alignment of all items on the main axis
  alignItems, //control alignment of all items on the cross axis
  alignContent, //control space between flex lines on the cross axis (if >1)
  columnGap, //Set gap between flex items
  rowGap, //Set gap between flex lines (if >1)
  sx = {},
}) {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        justifyContent,
        alignItems,
        alignContent,
        columnGap,
        rowGap,
      }}
    >
      {children}
    </Box>
  );
}

const positionalAlignment = ["flex-start", "flex-end", "center"];
const distributedAlignment = ["space-between", "space-around", "space-evenly"];
const other = ["normal", "stretch"];

const contentProps = [
  ...positionalAlignment,
  ...distributedAlignment,
  ...other,
  ...cssGlobalValues,
];

const alignItemsProps = [...positionalAlignment, ...other, ...cssGlobalValues];

Flexbox.propTypes = {
  children: PropTypes.node,
  justifyContent: PropTypes.oneOf(contentProps),
  alignItems: PropTypes.oneOf(alignItemsProps),
  alignContent: PropTypes.oneOf(contentProps),
  columnGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sx: PropTypes.object,
};
