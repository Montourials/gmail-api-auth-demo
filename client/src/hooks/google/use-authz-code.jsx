import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getAuthzUrl } from "src/services/__index.js";

export default function useAuthzCode() {
  const navigate = useNavigate();

  const getCode = useCallback(async () => {
    const authzUrl = await getAuthzUrl();
    navigate(authzUrl);
  }, [navigate]);

  return getCode;
}
