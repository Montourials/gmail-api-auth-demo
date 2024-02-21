import _authenticationRouter from "./authentication.js";
import _authzRouter from "./authorization.js";
import _sendersRouter from "./senders/senders.js";

export const authenticationRouter = _authenticationRouter;
export const authzRouter = _authzRouter;
export const sendersRouter = _sendersRouter;

export default {
  authenticationRouter,
  authzRouter,

  sendersRouter,
};
