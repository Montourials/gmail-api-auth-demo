import { useRouteError } from "react-router-dom";

import { TakeMeHomeButton } from "src/components/__index.js";

export default function ErrorPage() {
  const error = useRouteError();

  console.warn("error page: ", error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.message}</i>
        <TakeMeHomeButton />
      </p>
    </div>
  );
}
