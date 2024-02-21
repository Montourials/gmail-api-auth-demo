export function requestLogger(req, _res, next) {
  console.log("------------------------");
  console.log("url:", req.url);
  console.log("method:", req.method);
  console.log("origin:", req.headers.origin);
  console.log("Authz token exists:", !!req.headers.authorization);
  console.log("------------------------");

  if (JSON.stringify(req.params) !== "{}") {
    console.log("params:", req.params);
    console.log("------------------------");
  }

  if (JSON.stringify(req.query) !== "{}") {
    console.log("query:", req.query);
    console.log("------------------------");
  }

  if (JSON.stringify(req.body) !== "{}") {
    console.log("body:", req.body);
    console.log("------------------------");
  }

  next();
}

export default { requestLogger };
