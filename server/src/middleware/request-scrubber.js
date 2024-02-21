//Removes any unwanted values that have been added to the request by middleware, such as the oauth client
export function requestScrubber(req, _res, next) {
  const body = req.body;

  delete body?.oauthClient;
  delete body?.gidToken;

  delete body?.currentUser;
  delete body?.userId;
  delete body?.gUserId;

  console.log("request scrubbed successfully");

  next();
}

export default { requestScrubber };
