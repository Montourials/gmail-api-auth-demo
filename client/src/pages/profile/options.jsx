import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Button, Typography } from "@mui/material";

import { Bread, Flexbox } from "src/components/__index.js";
import { uris } from "src/config/__index.js";
import { makeToast } from "src/util/__index.js";

export default function Options() {
  const navigate = useNavigate();
  const [isTimeToRoll, setIsTimeToRoll] = useState(false);

  const handleButtons = (buttonNumber) => {
    const warnBread = (
      <Bread
        type="warn"
        title="Sorry!"
        subheader="This feature is not available yet"
      />
    );

    switch (buttonNumber) {
      case 1:
        makeToast({
          bread: warnBread,
          id: uuid(),
        });
        setIsTimeToRoll(true);
        break;

      case 2:
        try {
          window.localStorage.setItem("_gmh_redirectingTo", "sendersList");
          navigate(uris.authzStart);
        } catch (e) {
          console.error("could not get access token", e);
        }

        break;

      case 3:
        makeToast({
          bread: warnBread,
          id: uuid(),
        });
        setIsTimeToRoll(true);
        break;

      default:
        throw new Error("invalid buttonNumber");
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{ marginY: "1em" }}
      >{`What would you like to do?`}</Typography>

      {isTimeToRoll && (
        <video src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" autoPlay />
      )}

      <Flexbox justifyContent="space-between">
        <Button
          size="small"
          onClick={() => handleButtons(1)}
        >{`Take me to my list of "NAUGHTY NAMES"`}</Button>

        <Button size="large" onClick={() => handleButtons(2)}>
          {`Show me all who dare occupy my space`}
        </Button>

        <Button
          size="small"
          onClick={() => handleButtons(3)}
        >{`Take me to my list of "HOMIES"`}</Button>
      </Flexbox>
    </>
  );
}
