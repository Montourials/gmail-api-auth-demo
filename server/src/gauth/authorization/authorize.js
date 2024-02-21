// import { google } from "googleapis";

// import { SCOPES, CREDENTIALS_PATH } from "../config/__index.js";

// import { loadSavedToken } from "./load-saved-token.js";
// import { saveToken } from "./save-token.js";
// import { createOAuthClient } from "./create-oauth-client.js";
// import { generateAuthUrl } from "./generate-auth-url.js";

// /**
//  * Load or request authorization to call APIs, and return the authenticated client
//  *
//  */
// export async function authorize() {
//   let client = await loadSavedToken();

//   if (client) {
//     return client;
//   }

//   const auth = await createOAuthClient();

//   client = google.gmail({ version: "v1", auth });

//   if (client.credentials) {
//     await saveToken(client);
//   }

//   return client;
// }

// export default {
//   authorize,
// };
