import List from "@mui/material/List";

import LicenseIcon from "~icons/ic/round-gavel";
import NoTrackersIcon from "~icons/ic/round-gps-off";
import IndependentIcon from "~icons/ic/outline-extension-off";
import AdFreeIcon from "~icons/ic/round-money-off";
import OpenSourceIcon from "~icons/ic/outline-task";
import HeartIcon from "~icons/ic/outline-volunteer-activism";

import { useScreenSize } from "src/hooks/__index.js";

import InfoMessage from "./info-message.jsx";

export default function AppInfo() {
  const { xs } = useScreenSize();

  return (
    <List disablePadding={xs}>
      <InfoMessage
        icon={<LicenseIcon />}
        primaryText="Licensing"
        secondaryText={
          "This application is licensed under [LICENSE], the terms of which are viewable at [LINK].\n" +
          "By continuing and/or using the website in any way, you agree to these terms."
        }
      />

      <InfoMessage
        icon={<NoTrackersIcon />}
        primaryText="No additional trackers or metrics"
        secondaryText={`However, it is always recommended to use the Firefox browser with the ublock origin extension installed and activated.`}
      />

      <InfoMessage
        icon={<IndependentIcon />}
        primaryText="No affiliations"
        secondaryText={`Developed independently from any corporation or organization, including Google/Alphabet.`}
      />

      <InfoMessage
        icon={<AdFreeIcon />}
        primaryText="Never any ads"
        secondaryText="Can't we as a society just be done with them yet?"
      />
      <InfoMessage
        icon={<OpenSourceIcon />}
        primaryText="Open-source"
        secondaryText="View the code any time at [wherever you cloned this repo from]."
      />
      <InfoMessage
        icon={<HeartIcon />}
        primaryText="Made with love <3"
        secondaryText="Merry Christmas!"
      />
    </List>
  );
}
