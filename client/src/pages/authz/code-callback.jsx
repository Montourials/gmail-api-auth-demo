import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import { uris } from "src/config/__index.js";
import { getUserStatus } from "src/util/__index.js";

export default function CodeCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTo = window.localStorage.getItem("_gmh_redirectingTo");

    switch (redirectTo) {
      case "sendersList":
        navigate(uris.senders);
        break;

      default:
        console.warn("invalid state");
        break;
    }
  }, [navigate]);

  return (
    <Typography variant="h6">{"Success! Redirecting again..."}</Typography>
  );
}
