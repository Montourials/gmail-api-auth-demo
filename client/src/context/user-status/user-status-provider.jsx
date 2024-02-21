import { useState, useContext, useEffect, useCallback } from "react";

import {
  isStorageAvailable,
  statuses,
  getUserStatus,
  setUserStatus,
} from "src/util/__index.js";

import UserStatusContext from "./user-status-context.js";

export default function UserStatusProvider({ children }) {
  const [currentStatus, setCurrentStatus] = useState(statuses.firstRender);

  useEffect(() => {
    if (!isStorageAvailable) {
      throw new Error("storage is unavailable");
    }

    const savedStatus = getUserStatus();

    if (savedStatus) {
      setCurrentStatus(savedStatus);
    }
  }, []);

  useEffect(() => {
    const savedStatus = getUserStatus();

    if (savedStatus !== currentStatus) {
      setUserStatus(currentStatus);
    }
  }, [currentStatus]);

  const setStatus = {
    firstRender: () => setCurrentStatus(statuses.firstRender),

    fresh: () => setCurrentStatus(statuses.fresh),
    returning: () => setCurrentStatus(statuses.returning),

    loggingIn: () => setCurrentStatus(statuses.loggingIn),
    loggingOut: () => setCurrentStatus(statuses.loggingOut),

    loggedIn: () => setCurrentStatus(statuses.loggedIn),
    sendersList: () => setCurrentStatus(statuses.sendersList),
  };

  return (
    <UserStatusContext.Provider
      value={{
        status: currentStatus,
        setStatus,
        statuses,
      }}
    >
      {children}
    </UserStatusContext.Provider>
  );
}
