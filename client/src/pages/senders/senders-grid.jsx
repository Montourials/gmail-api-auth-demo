import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import { Box, Divider, Typography } from "@mui/material";
import WarningIcon from "~icons/ic/warning";

import DeleteButton from "./delete-button";

export default function SendersGrid({ listData, isInitialQuery, children }) {
  const [gridReady, setGridReady] = useState(false);
  const gridRef = useRef();

  const rowData = useMemo(() => listData, [listData]);
  const [columnDefs] = useState([
    { field: "name", checkboxSelection: true },
    { field: "email" },
    { field: "count" },
  ]);

  return (
    <>
      <div
        className="ag-theme-quartz"
        style={{ height: "80vh", maxWidth: "80vw", marginRight: 5 }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={"multiple"}
          enableCellChangeFlash={true}
          cellFlashDelay={20000}
          cellFadeDelay={25000}
          rowMultiSelectWithClick={true}
          autoSizeStrategy={{
            type: "fitGridWidth",
          }}
          ref={gridRef}
          onGridReady={() => setGridReady(true)}
          getRowId={(params) => params?.data?.senderId}
        />
      </div>

      {children}

      {isInitialQuery && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WarningIcon />
          <Typography variant="h6" sx={{ ml: 1, mt: 0.1 }}>
            {`It is `}
            <strong>{"highly recommended"}</strong>
            {" to wait until the list finishes compiling before continuing"}
          </Typography>
        </Box>
      )}
      {gridReady && (
        <DeleteButton
          gridApi={gridRef.current?.api}
          isQueryPending={isInitialQuery}
        />
      )}
    </>
  );
}
