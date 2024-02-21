export const serverUrl = import.meta.env.DEV
  ? "http://localhost:3001/api"
  : "https://some-app-name.fly.dev/api";

export const apis = {
  authenticate: `authenticate`,
  authorize: "authz",
};

export const methodPaths = {
  login: `${serverUrl}/${apis.authenticate}/login`,

  authzToken: `${serverUrl}/${apis.authorize}/token`,
};

export default {
  serverUrl,
  apis,
  methodPaths,
};
