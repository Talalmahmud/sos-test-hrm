import { Box, CircularProgress } from "@mui/material";
import React from "react";

type Props = {};

const LoadingProgressBar = (props: Props) => {
  return (
    <div className=" min-h-screen w-full flex justify-center items-center">
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CircularProgress sx={{ height: "800px", width: "800px" }} />
      </Box>
    </div>
  );
};

export default LoadingProgressBar;
