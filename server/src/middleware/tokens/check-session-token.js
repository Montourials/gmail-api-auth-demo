import { verifyJwt, renewJwt } from "../../helpers/__index.js";

export async function checkSessionToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).send("missing session token");
  }

  try {
    const token = authHeader.substring(7);
    const currentUser = verifyJwt(token);
    req.body.currentUser = currentUser;

    const newToken = renewJwt(token);

    if (newToken) {
      res.setHeader("NewSessionToken", newToken);
    }

    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res
        .status(401)
        .send("Your session has expired, please login again");
    } else if (e.name === "JsonWebTokenError") {
      console.error(e.message);
      return res.status(400).send("GTFOH");
    } else {
      console.error(`oopsies`, e);

      return res.status(500).send("oopsies");
    }
  }
}

export default { checkSessionToken };
