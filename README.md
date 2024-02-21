# Gmail Helper

A JavaScript web app demo with authentication using Google Identity Services and JWTs, authorization using oauth2, and access to Google's Gmail API via their nodeJS client library.

![Main functionality, the "sender's list"](./images/senders%20list.png)

🚧 This is a personal project made for fun by a solo, self-taught hobbyist. There are plenty of questionable development choices and no guarantee is made on performance or functionality. It is being made public in the off-chance the code could help someone learn, but if for some reason you actually happen to use or reference this code you do so at your own risk. Credit is nice, but not required. 🚧

**See [LICENSE](./LICENSE.txt) for more information.**

---

## Install and run locally via NPM

1. Create project credentials by following [Google's guide](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid), and add any test users to the oauth consent screen as needed
2. Ensure you have a Mongo account and a database link for the DB_URL environment variable, which gets added in step 5
3. Clone this repo, placing it wherever you can run and modify it
4. Create a .env.development.local file in the client directory, and add CLIENT_ID=\_\_\_\_ (your client ID)
   -Vite will add values from .env files to environment variables, accessible during run-time at import.meta.env.ENV_VAR
   -Alternatively, hard-code the client id in src/hooks/google/use-gis-client.jsx or pass it to the init function any other way
5. Create a .env file in the server directory and copy the variables from server/example-env.txt, replacing with your own values as needed
6. Run the server and client separately via their respective 'npm run dev' scripts
7. Navigate to [http://localhost:5173](http://localhost:5173) in the browser and use the app

## Deploy via fly.io

1. Install a local version by following the steps above
2. Ensure you have fly.io credentials, are signed in, and are able to use fly launch via flyctl
3. Run the "npm run init" or "fly launch" command in the server directory, but do not deploy yet when prompted
4. Add the "secret" environment variables (eg DB_URL, PRIVATE_KEY, etc.) to fly.io using "fly secrets add"
5. If needed, deploy the app to get the base url for your app (don't bother building yet)
6. Add the base url to the 'build' script in package.json and the ORIGIN variable in the Dockerfile
7. Use command "npm run deploy:build" or "npm run deploy:full" to build the client and deploy the app
8. Navigate to your base url in the browser and use the app

---

### App flow

---

#### Welcome page

![Welcome page](./images/Welcome%20page.png)

The user taps the login button and follows the steps to authenticate with Google, who returns an ID token after the user completes this process. The token is then sent to the backend and decoded into the user's unique Google user ID. This id is stored in the database, and also returned to the browser re-encoded as a JWT for use as a "session token". All authz requests to our server require a valid session token, indicating the user is logged-in, but this token is automatically renewed if used near-expiration.

---

#### Profile page

![Profile page](./images/profile%20page.png)

Not much to see here beyond some basic information about the logged-in user, this simple page mostly acts as a separation between the authentication and authorization moments - giving the user a choice of actions to take and allowing them to explicitly decide when they're ready to authorize the app to access data on their behalf. The middle button is the only one actually implemented, and tapping it starts Google's authorization process by redirecting to their oauth consent screen.

---

#### Authz code handling

The user might not see much from these pages, but they are important. Following Google's authz process, a code is returned and immediately sent to the backend, which exchanges it for refresh and/or access tokens. If the user is new, we include "&prompt=consent" to get a refresh token in addition to the standard access tokens. The refresh token is associated with the current user in the database, which allows a logged-in user to continually get new access tokens and continue using the app.

---

#### **Senders list**

![Senders list](./images/senders%20list%20full.png)

This is the core functionality of the app. We use an infinite query to make requests until every single email has been counted, page by page. One request is made to our server, which fetches a page of emails and parses them, returning a count for that page. When the page is returned, the new counts are added to the old counts and the next page is fetched if there is one.

After the first page has returned, senders can be selected from the list and use the delete button to delete every email from them at once. This will, however, invalidate the infinite query and the list will have to be re-compiled.

---

##### Thanks to

- Mozilla, for their incredible documentation (and browser)
- The developers and maintainers of the packages used by the [client](./client/package.json) and [server](./server/package.json)
- Google for their APIs, libraries, documentation, and any code samples that may have been used in this project
- All of the amazing people who answer questions and write tutorials and have undoubtedly contributed but I have forgotten

---

###### Frameworks & technologies used

- Vite
- ReactJS
- NodeJS
- MongoDB

###### Primary npm packages used by client

- material UI
- react-query
- axios
- react-router
- ag-grid-react
- react-toastify

###### Primary npm packages used by server

- express
- mongoose
- google-auth-library
- googleapis
- jsonwebtoken

###### Links

- [Google Authentication](https://developers.google.com/identity/gsi/web/guides/overview)
- [Google Authorization](https://developers.google.com/identity/oauth2/web/guides/overview)
- [Gmail API overview](https://developers.google.com/gmail/api/guides)
- [Gmail REST API Reference](https://developers.google.com/gmail/api/reference/rest)
- [Guide to creating custom Google Sign-in button](https://medium.com/@leonardosalles/a-guide-to-custom-google-sign-in-button-e7b02c2c5e4f)
