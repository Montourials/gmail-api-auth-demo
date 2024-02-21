import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Typography, LinearProgress } from "@mui/material";

import { makeRequest } from "src/services/__index.js";

export default function DeleteButton({ gridApi, isQueryPending }) {
  const queryClient = useQueryClient();

  const { mutate, isIdle, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ["senders-del"],
    mutationFn: async (sendersToDelete) =>
      await makeRequest({
        router: "senders",
        route: "del",
        method: "delete",
        data: sendersToDelete,
      }),
    onMutate: (sendersToDelete) => {
      gridApi.setGridOption("deltaSort", true);
      gridApi.applyTransaction({ remove: sendersToDelete });
      return sendersToDelete;
    },
    onError: (err, sendersToDelete) => {
      console.error(err);
      gridApi.applyTransaction({ add: sendersToDelete });
    },
    onSettled: () => {
      if (!gridApi.isDestroyed()) {
        gridApi.refreshCells();
        gridApi.setGridOption("deltaSort", false);
      }

      return queryClient.invalidateQueries({ queryKey: ["senders-list"] });
    },
  });

  const submitDeleteRequest = useCallback(() => {
    if (!isIdle && !isSuccess) return;

    const selectedRows = gridApi.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) return;

    const confirm = window.confirm(
      "Are you sure you wish to delete ALL emails from the selected sender(s)?"
    );
    if (!confirm) return;

    mutate(selectedRows); //"the mutate function is an asynchronous function" according to tanstack docs, but there's also mutateAsync which returns a promise
  }, [isIdle, isSuccess, gridApi, mutate]);

  if (isError) {
    return (
      <Typography variant="h3">{`somebody make an oopsie :( [${error}]`}</Typography>
    );
  }

  return (
    <Button
      variant="contained"
      color={isQueryPending ? "warning" : "secondary"}
      onClick={submitDeleteRequest}
      sx={{ my: "1em", py: "1em" }}
    >
      {"Delete ALL emails from the selected sender(s)"}
    </Button>
  );
}
