import google from "./google/__index.js";
import _useSuccessMessage from "./use-toaster/use-success-message.jsx";
import _useToaster from "./use-toaster/useToaster.jsx";

// import _useBackButton from "./use-back-button.jsx";
import _useScreenSize from "./use-screen-size.jsx";
import _useStopwatch from "./use-stopwatch.jsx";

export const { useGISClient, useOAuthClient, useAuthzToken } = google;

export const useSuccessMessage = _useSuccessMessage;
export const useToaster = _useToaster;

// export const useBackButton = _useBackButton;
export const useScreenSize = _useScreenSize;
export const useStopwatch = _useStopwatch;

export default {
  useGISClient,
  useOAuthClient,

  useSuccessMessage,
  useToaster,

  // useBackButton,
  useScreenSize,
  useStopwatch,
};
