import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, Typography, LinearProgress } from "@mui/material";
import { v4 as uuid } from "uuid";

import { TakeMeHomeButton, Loading } from "src/components/__index.js";
import { makeRequest } from "src/services/__index.js";
import { setSessionToken } from "src/util/__index.js";

import SendersGrid from "./senders-grid";
import DisplayData from "./display-data";

export default function Senders() {
  const [isQueryCompleted, setIsQueryCompleted] = useState(false);
  const [isReauthorizing, setIsReauthorizing] = useState(false);
  const reauthorizing = useRef();

  const compileSendersList = useCallback((data) => {
    if (!Array.isArray(data?.pages) || data.pages.length < 1) {
      console.warn("unexpected data: ", data);
      return data;
    }

    let sendersCount = {};

    data.pages.forEach((page) => {
      const listToAdd = page.sendersList;

      if (!Array.isArray(listToAdd)) {
        console.warn("no sendersList found in page: ", page.pageId);
        return;
      }

      listToAdd.forEach((senderToAdd) => {
        if (!senderToAdd.email) {
          console.warn("unexpected sender (invalid email): ", senderToAdd);
          return;
        }

        const email = `${senderToAdd.email}`;

        const existingSender = sendersCount[email];

        if (existingSender) {
          const senderNow = {
            ...existingSender,
            count: existingSender.count + senderToAdd.count,
          };

          sendersCount[email] = senderNow;
        } else {
          sendersCount[email] = {
            ...senderToAdd,
            senderId: uuid(),
          };
        }
      });
    });

    let totalMessages = 0;

    const fullSendersList = Object.keys(sendersCount).map((key) => {
      totalMessages += sendersCount[key].count;
      return sendersCount[key];
    });

    return { ...data, fullSendersList, totalMessages };
  }, []);

  const getSendersList = useCallback(async ({ pageParam }) => {
    const resData = await makeRequest({
      router: "senders",
      route: "list",
      method: "post",
      data: {
        nextPageToken: pageParam,
      },
    });

    if (resData?.pageId && !resData?.nextPageToken) {
      setIsQueryCompleted(true);
    }

    return resData;
  }, []);

  //senders list query
  const {
    data,
    failureReason,
    isPending, //status: no cached data and no query attempt was finished yet
    isError, //status: query attempt resulted in an error

    isFetching, //fetchStatus: QueryFn is executing (initial 'pending' OR background refetch)
    isFetchingNextPage, //Infinite query is fetching the next page
    isRefetching, //same as: isFetching && !isPending && !isFetchingNextPage && !isFetchingPreviousPage
    isLoading, //same as: isFetching && isPending (First fetch for a query is in-flight)
    refetch,
    dataUpdatedAt,
    errorUpdatedAt,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["senders-list"],
    queryFn: getSendersList,
    select: compileSendersList,

    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      const nextPageToken = lastPage?.nextPageToken;
      if (nextPageToken) return nextPageToken;
    },

    retry: 5,
    retryDelay: (retries) => retries * 5000,
    refetchOnWindowFocus: false,
  });

  const startReauthorization = useCallback(() => {
    const prompt = window.google.accounts?.id?.prompt;

    if (!prompt) {
      console.warn("could not prompt");
      return;
    }

    prompt((notification) => {
      const failed =
        notification.isNotDisplayed() || notification.isSkippedMoment();

      if (!failed) {
        console.log("prompt was successful");
        setIsReauthorizing(false);
      }
    });
  }, []);

  //Query is finished
  useEffect(() => {
    if (isQueryCompleted && isRefetching) {
      console.log("query was complete, now is refetching");
      setIsQueryCompleted(false);
    }
  }, [isQueryCompleted, isRefetching]);

  //Fetch the next page until there are no more
  useEffect(() => {
    if (isFetching || isError || failureReason) return;

    if (hasNextPage) {
      //cancelRefresh: if false, calling fetchNextPage repeatedly has no effect until the first invocation has resolved
      fetchNextPage({ cancelRefetch: false });
    }
  }, [
    isFetching,
    isLoading,
    isError,
    failureReason,
    hasNextPage,
    fetchNextPage,
  ]);

  const isAuthzError = useMemo(() => {
    const res = failureReason?.response;
    if (res?.status !== 401) return false;

    return !(
      typeof res?.data === "string" &&
      res?.data?.toLowerCase().includes("session has expired")
    );
  }, [failureReason]);

  const isSessionError = useMemo(() => {
    const res = failureReason?.response;
    if (res?.status !== 401) return false;

    return (
      typeof res?.data === "string" &&
      res?.data?.toLowerCase().includes("session has expired")
    );
  }, [failureReason]);

  if (isSessionError) {
    return (
      <>
        <Typography variant="h5" mb={"0.25em"}>
          {"Sorry, your session has expired!"}
        </Typography>
        <TakeMeHomeButton />
      </>
    );
  } else if (isReauthorizing) {
    return <Loading />;
  } else if (isAuthzError) {
    return (
      <>
        <Typography variant="h5">
          {"Re-authorization is required, please click the button below"}
        </Typography>
        {isFetching && (
          <LinearProgress sx={{ my: 2, maxWidth: "75%", mx: "auto" }} />
        )}
        {!isReauthorizing && (
          <Button
            onClick={() => {
              startReauthorization();
              setIsReauthorizing(true);
            }}
          >
            {"Authorize"}
          </Button>
        )}
        <TakeMeHomeButton />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Typography variant="h5">{"Oops, something went wrong!"}</Typography>
        <TakeMeHomeButton />
        <Button onClick={refetch}>Retry</Button>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Loading />
        <DisplayData
          totalMessages={data?.totalMessages}
          numberOfPages={data?.pages.length}
          isFetching={isFetching}
          display={false}
        />
      </>
    );
  }

  return (
    <>
      <SendersGrid
        listData={data?.fullSendersList}
        isInitialQuery={isPending || isFetchingNextPage}
      >
        {isRefetching && (
          <Typography variant="h6" mt={"1em"}>
            {"Data is refreshing..."}
          </Typography>
        )}
        {isFetching && (
          <LinearProgress
            sx={{ mb: "1em", mt: "1.5em", maxWidth: "75%", mx: "auto" }}
          />
        )}
      </SendersGrid>
      <DisplayData
        totalMessages={data?.totalMessages}
        numberOfPages={data?.pages.length}
        lastUpdated={dataUpdatedAt}
        lastError={errorUpdatedAt}
        isQueryCompleted={isQueryCompleted}
        isFetching={isFetching}
      />
    </>
  );
}
