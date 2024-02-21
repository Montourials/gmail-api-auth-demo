import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { msToTime, msToSeconds } from "src/util/__index";
import { useStopwatch } from "src/hooks/__index.js";

export default function DisplayData({
  totalMessages,
  numberOfPages,
  lastUpdated,
  lastError,
  isFetching,
  isQueryCompleted,
  display = true,
}) {
  const [fetches, setFetches] = useState([]);
  const { isRunning, toggle, stop, reset, timeInMs } = useStopwatch();

  useEffect(() => {
    //Start the stopwatch as we are fetching data
    if (isFetching && !isRunning) {
      reset();
      toggle();
    }
  }, [isFetching, isRunning, reset, toggle]);

  useEffect(() => {
    if (isQueryCompleted) {
      stop();
    }
  }, [isQueryCompleted, stop]);

  useEffect(() => {
    //Don't update until new data arrives
    if (isFetching || !numberOfPages || fetches.length === numberOfPages)
      return;

    const fetchesNow = fetches.concat([timeInMs]);
    setFetches(fetchesNow);
  }, [fetches, isFetching, numberOfPages, timeInMs]);

  const avgFetchTime = useMemo(() => {
    if (fetches.length === 0 || !totalMessages) return;

    let total = 0;
    fetches.forEach((fetchTime) => (total += fetchTime));

    const perPage = (total / fetches.length).toFixed(5);
    const perMessage = (total / totalMessages).toFixed(2);

    return { perPage: +perPage, perMessage: +perMessage };
  }, [fetches, totalMessages]);

  if (display)
    return (
      <>
        <Divider sx={{ width: "90%", mx: "auto", my: "1.5em" }} />

        <Box sx={{ my: "1em", display: "flex", justifyContent: "center" }}>
          <Typography variant="h5" sx={{ mx: "0.25em" }}>
            {"Last updated:"}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mx: "0.25em" }}
          >{`${lastUpdated ? msToTime(lastUpdated) : "N/A"}`}</Typography>
        </Box>

        <Divider sx={{ width: "90%", mx: "auto", mb: "2em", mt: "1.5em" }} />

        <Box my={"1em"}>
          <Typography>{`Messages fetched: ${
            totalMessages ?? "???"
          } (pages: ${numberOfPages})`}</Typography>
        </Box>

        <Box sx={{ my: "1em" }}>
          <Typography>{`Average fetch time per message: ~${avgFetchTime?.perMessage}ms`}</Typography>
        </Box>

        <Box sx={{ my: "1em" }}>
          <Typography>{`Average fetch time per page of messages: ~${msToSeconds(
            avgFetchTime?.perPage
          )}s`}</Typography>
        </Box>

        <Box sx={{ my: "1em" }}>
          <Typography variant="caption1">{"Last error: "}</Typography>
          <Typography variant="caption2">{`${
            lastError ? msToTime(lastError) : "N/A"
          }`}</Typography>
        </Box>
      </>
    );
}
